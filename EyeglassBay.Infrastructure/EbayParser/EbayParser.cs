using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using EyeglassBay.Infrastructure.EbayParser.Models;
using HtmlAgilityPack;

namespace EyeglassBay.Infrastructure.EbayParser
{
    public class EbayParser
    {
        private const string BaseUrl = "https://www.ebay.com/sch/?_ipg={0}&_nkw={1}&_pgn={2}";

        public EbayParser()
        {
            
        }

        public async Task<IList<EbayProductItem>> GetItemsAsync(string request)
        {
            const int itemsPerPage = 200;
            const int pageNumber = 1;
            var result = new List<EbayProductItem>();
            //choose your website
            var url = string.Format(BaseUrl, itemsPerPage, request, pageNumber);

            //get the html page source 
            var httpClient = new HttpClient();
            var html = await httpClient.GetStringAsync(url);

            //store the html of the page in a variable
            var doc = new HtmlDocument();
            doc.LoadHtml(html);

            var productsHtml =
                doc.DocumentNode.SelectNodes(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" srp-results "")]/li");

            foreach (var item in productsHtml)
            {
                var productName =
                    item.SelectSingleNode(
                        @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//a/h3").InnerText;

                var price = item
                    .SelectSingleNode(
                        @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__price "")]")
                    .InnerText;

                var itemUrl = item.SelectSingleNode(
                    @".//*[contains(concat("" "",normalize-space(@class),"" ""),"" s-item__info "")]//a").GetAttributeValue("href", "");

                var ebayItem = CreateItem(productName, price, itemUrl);
                result.Add(ebayItem);
            }

            var minPrice = result.Min(x => x.Price);
            return result;
        }

        private EbayProductItem CreateItem(string productName, string price, string itemUrl)
        {  
            var splitPrice = price?.Replace("$", "").Split(" ", StringSplitOptions.RemoveEmptyEntries)
                .FirstOrDefault();
            double.TryParse(splitPrice, out double parsedPrice);
            return new EbayProductItem
            {
                Price = parsedPrice,
                ProductName = productName,
                Url = itemUrl
            };
        }
    }
}