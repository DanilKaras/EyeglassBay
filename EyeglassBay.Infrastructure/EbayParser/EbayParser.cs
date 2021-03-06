using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using EyeglassBay.Domain.DTOs;
using EyeglassBay.Domain.Models;
using EyeglassBay.Infrastructure.Models;
using EyeglassBay.Persistence;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EyeglassBay.Infrastructure.EbayParser
{
    public class EbayParser
    {
        private readonly DataContext _context;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private decimal _calculationCoefficient;
        public EbayParser(ILogger<EbayParser> logger, IConfiguration configuration, DataContext context)
        {
            _logger = logger;
            _configuration = configuration;
            _context = context;
        }

        public async Task<EbayProductItem> GetMinPricedItemAsync(EbayRequestDto request)
        {
            var items = await GetItemsAsync(request);

            var ebayItems = GetItemsOrderedByPrice(items);

            if (ebayItems.Count == 1)
            {
                return await GetItemLowestPriced(ebayItems[0]);
            }
            
            return await GetItemLowestPricedFromList(ebayItems);
        }

        public async Task<IList<EbayProductItem>> GetItemsAsync(EbayRequestDto request)
        {
            var result = new List<EbayProductItem>();
            try
            {
                await SetCalculationCoefficient();
                const int pageNumber = 1;

                if (!int.TryParse(_configuration["Ebay:ItemsPerPage"], out var itemsPerPage)) return result;

                var baseUrl = _configuration["Ebay:BaseUrl"];

                if (string.IsNullOrEmpty(baseUrl)) return result;

                var url = string.Format(baseUrl, itemsPerPage, HttpUtility.HtmlEncode(request.SearchString), pageNumber);

                var doc = await GetHtmlDocument(url);
                
                var targetStyleClass = GetSponsoredTargetStyle(doc);

                var productsHtml = GetAllItems(doc);
                if (productsHtml.Count == 0) return new List<EbayProductItem>();

                var count = GetItemsCount(doc);
                if (count == default) return new List<EbayProductItem>();

                foreach (var node in productsHtml)
                {
                    if (node.InnerHtml.Contains(targetStyleClass)) continue;
                    var ebayItem = await CollectDataForEbayItem(node, request);
                    result.Add(ebayItem);
                    if (result.Count == count) break;
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return result;
            }
        }


        private async Task<EbayProductItem> CollectDataForEbayItem(HtmlNode item, EbayRequestDto request)
        {
            var productName = GetProductName(item);
            var price = GetPrice(item);
            var logistic = GetLogistics(item);
            var itemUrl = GetItemUrl(item);
            var itemImage = GetItemImage(item);
            var itemDiscount = GetItemDiscount(item);
            var itemPriceWithNoDiscount = string.Empty;
            if (!string.IsNullOrEmpty(itemDiscount))
            {
                itemPriceWithNoDiscount = GetItemPriceWithNoDiscount(item);
            }

            var ebayItem = CreateItem(productName, price, itemUrl, itemImage);
            GetLogisticCost(logistic, ebayItem);
            GetDiscount(itemDiscount, itemPriceWithNoDiscount, ebayItem);
            CalculateTotalPrice(ebayItem);
            try
            {
                var shop = await GetShopPage(ebayItem);
                GetShopName(shop, ebayItem);
                GetShopStock(shop, ebayItem);
            }
            catch (Exception)
            {
                _logger.LogError($"Couldn't get the shop inf by url {ebayItem.Url}");
            }


            CalculateProfit(ebayItem, request.OriginalPrice, request.Coefficient);


            return ebayItem;
        }
        
        private void GetDiscount(string discountString, string priceWithNoDiscountString, EbayProductItem ebayItem)
        {
            if (string.IsNullOrEmpty(discountString)) return;
            if (!decimal.TryParse(discountString.TrimEnd('%', ' '), out var discount)) return;
            ebayItem.Discount = discount;
            if (decimal.TryParse(priceWithNoDiscountString.TrimStart('$', ' '), out var price))
            {
                ebayItem.PriceNoDiscount = price;
            }
        }
        
        private void GetLogisticCost(string logistic, EbayProductItem ebayItem)
        {
            if (string.IsNullOrEmpty(logistic)) return;
            try
            {
                switch (logistic)
                {
                    case Constants.Logistic.FreeShipping:
                        ebayItem.IsFreeDelivery = true;
                        break;
                    case Constants.Logistic.NotSpecified:
                        ebayItem.IsDeliveryNotSpecified = true;
                        break;
                    default:
                        var price = logistic.Split(" ", StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
                        var indexOf = price?.IndexOf("$");
                        if (!indexOf.HasValue || indexOf < 0) break;

                        ebayItem.DeliveryPrice =
                            ConvertStringToDecimal(price.Substring(indexOf.Value + 1,
                                price.Length - indexOf.Value - 1));
                        break;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Couldn't convert decimal {logistic}");
            }
        }

        private async Task<HtmlDocument> GetShopPage(EbayProductItem ebayItem)
        {
            if (!string.IsNullOrEmpty(ebayItem.Url))
            {
                return await GetHtmlDocument(ebayItem.Url);
            }

            return null;
        }


        private bool GetIsMyShop(string shopName, EbayProductItem ebayItem)
        {
            var myShopName = _configuration["Ebay:ShopName"];
             ebayItem.ShopName = shopName;
             if (shopName != null && shopName.ToLower().Contains(myShopName.ToLower()))
             {
                 return true;
             }

             return false;
        }
        private void GetShopName(HtmlDocument doc, EbayProductItem ebayItem)
        {
            var shopName = doc.DocumentNode
                .SelectSingleNode(
                    @".//*[@id=""RightSummaryPanel""]//*[contains(concat("" "",normalize-space(@class),"" ""),"" ux-seller-section__item--seller "")]//a//span")
                ?.InnerHtml;

            ebayItem.ShopName = shopName;
            ebayItem.IsMyShop = GetIsMyShop(shopName, ebayItem);
        }

        private void GetShopStock(HtmlDocument doc, EbayProductItem ebayItem)
        {
            var shopStock = doc.DocumentNode.SelectSingleNode(
                @".//*[@id=""qtySubTxt""]/span")?.InnerHtml;
            ebayItem.Stock = shopStock?.Trim();
        }
        
        private EbayProductItem CreateItem(string productName, string price, string itemUrl, string itemImage)
        {
            var splitPrice = price?.Replace("$", "").Split(" ", StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();

            if (string.IsNullOrEmpty(splitPrice))
            {
                return null;
            }

            decimal priceDecimal = 0;
            try
            {
                priceDecimal = ConvertStringToDecimal(splitPrice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Couldn't convert decimal {splitPrice}");
            }

            return new EbayProductItem {Price = priceDecimal, ProductName = productName, Url = itemUrl, Image = itemImage};
        }

        private string GetSponsoredTargetStyle(HtmlDocument doc)
        {
            var getSponsoredClass = doc?.DocumentNode.SelectNodes("//*[contains(., 'display: inline;')]")
                ?.Where(x => x.Name == "style")
                .FirstOrDefault();

            var styles = getSponsoredClass?.OuterHtml;
            var str = string.Join("", styles?.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries)!);
            var startPattern = @"<styletype=""text/css"">span.s-";
            var endPattern = "{display:inline;}";
            var indexOfStart = str.IndexOf(startPattern, StringComparison.Ordinal);
            var indexOfEnd = str.IndexOf(endPattern, StringComparison.Ordinal);
            if (indexOfStart < 0 || indexOfEnd < 0) return string.Empty;
            indexOfStart += startPattern.Length;
            return str.Substring(indexOfStart, indexOfEnd - indexOfStart);
        }

        private decimal ConvertStringToDecimal(string price)
        {
            var culture = new CultureInfo("en-US");
            return Convert.ToDecimal(price, culture);
        }

        private void CalculateTotalPrice(EbayProductItem ebayItem)
        {
            if (ebayItem == null) return;
            ebayItem.TotalPrice = ebayItem.Price + (ebayItem.DeliveryPrice ?? 0);
        }

        private async Task<HtmlDocument> GetHtmlDocument(string url)
        {
            try
            {
                using (var httpClient = new HttpClient {Timeout = TimeSpan.FromMinutes(10)})
                {
                    httpClient.DefaultRequestHeaders.Add("Connection", "keep-alive");
                    var htmlStream = await httpClient.GetStreamAsync(url);
                    using (var reader = new StreamReader(htmlStream))
                    {
                        var html = await reader.ReadToEndAsync();
                        var doc = new HtmlDocument();
                        doc.LoadHtml(html);
                        
                        return doc;
                    }
                }
            }
            catch (Exception ex)
            {
                var message = $"Couldn't execute the request for URL: {url}";
                _logger.LogError(ex, message);
                throw;
            }
        }

        private HtmlNodeCollection GetAllItems(HtmlDocument doc)
        {
            var productsHtml =
                doc.DocumentNode.SelectNodes(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" srp-results "")]/li");
            return productsHtml;
        }

        private int GetItemsCount(HtmlDocument doc)
        {
            var countNode = doc.DocumentNode.SelectSingleNode(
                @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" srp-controls__count-heading "")]//span[not(preceding-sibling::*)]");

            if(!double.TryParse(countNode?.InnerText, out var count)) return 0;
            return (int)count;
        }

        private string GetProductName(HtmlNode item)
        {
            return item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//a/h3")
                ?.InnerText;
        }

        private string GetPrice(HtmlNode item)
        {
            return item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__price "")]")
                ?.InnerText;
        }

        private string GetLogistics(HtmlNode item)
        {
            return item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__logisticsCost "")]")
                ?.InnerText;
        }

        private string GetItemUrl(HtmlNode item)
        {
            return item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//a")?
                .GetAttributeValue("href", "");
        }

        private string GetItemImage(HtmlNode item)
        {
            return item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__image-img "")]")?
                .GetAttributeValue("src", "");
        }

        private string GetItemDiscount(HtmlNode item)
        {
            var discountInnerText = item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__discount "")]")
                ?.InnerText;
            if (string.IsNullOrEmpty(discountInnerText)) return string.Empty;
            var discountString = discountInnerText.Split(' ', StringSplitOptions.TrimEntries).FirstOrDefault();
            return discountString;
        }

        private string GetItemPriceWithNoDiscount(HtmlNode item)
        {
            var priceInnerText = item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__trending-price "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" STRIKETHROUGH "")]")
                ?.InnerText;
            if (string.IsNullOrEmpty(priceInnerText)) return string.Empty;
            return priceInnerText;
        }
        
        private async Task<EbayProductItem> GetItemLowestPriced(EbayProductItem item)
        {
            var shopPage = await GetShopPage(item);
            GetShopName(shopPage, item);
            return item;
        }

        private IList<EbayProductItem> GetItemsOrderedByPrice(IList<EbayProductItem> items)
        {
            var minPrice = items.Min(x => x.TotalPrice);
            var ebayItems = items.OrderBy(x => x.TotalPrice).Where(x => x.TotalPrice == minPrice).ToList();
            return ebayItems;
        }

        private async Task<EbayProductItem> GetItemLowestPricedFromList(IList<EbayProductItem> items)
        {
            var compareShops = new List<EbayProductItem>();
            foreach (var ebayItem in items)
            {
                var shopPage = await GetShopPage(ebayItem);
                GetShopName(shopPage, ebayItem);
                if (ebayItem.IsMyShop)
                {
                    return ebayItem;
                }

                compareShops.Add(ebayItem);
            }
            return compareShops.FirstOrDefault();
        }

        private void CalculateProfit(EbayProductItem item, decimal buyingPrice, int percentage)
        {
            try
            {
                decimal result;
                if (item.IsMyShop)
                {
                    result = item.IsDiscounted 
                        ? CalculateProfitForDiscountedItem(item, buyingPrice, percentage) 
                        : CalculateProfitForNonDiscountedItem(item, buyingPrice, percentage);
                }
                else
                {
                    result = CalculateProfitForDiscountedItem(item, buyingPrice, percentage);
                }
                item.Profit = result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                throw;
            }
        }

        private async Task SetCalculationCoefficient()
        {
            const string calculationCoefficient = "CalculationCoefficient";
            var settings = await _context.Settings
                .SingleOrDefaultAsync(setting => setting.Key.Equals(calculationCoefficient));

            if (decimal.TryParse(settings.Value, out var result))
            {
                _calculationCoefficient = result;
                return;
            }

            _calculationCoefficient = 0;
        }
        
        private decimal CalculateProfitForDiscountedItem(EbayProductItem item, decimal buyingPrice, int percentage)
        {
            var priceWithNoCommission = item.TotalPrice * (1m - _calculationCoefficient) -5;
            var clearPrice = buyingPrice * (1 - (decimal)percentage / 100);
            return decimal.Round(priceWithNoCommission - clearPrice, 2);
        }
        
        private decimal CalculateProfitForNonDiscountedItem(EbayProductItem item, decimal buyingPrice, int percentage)
        {
            var priceRemoveAmountWhenNoDiscount = item.TotalPrice * (decimal) 0.87;
            var priceWithNoCommission = priceRemoveAmountWhenNoDiscount * (1m - _calculationCoefficient) -5;
            var clearPrice = buyingPrice * (1 - (decimal)percentage / 100);
            return decimal.Round(priceWithNoCommission - clearPrice, 2);
        }
    }
}