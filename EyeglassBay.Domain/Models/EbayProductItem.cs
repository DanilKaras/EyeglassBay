namespace EyeglassBay.Domain.Models
{
    public class EbayProductItem
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }
        public bool IsFreeDelivery { get; set; }
        public bool IsDeliveryNotSpecified { get; set; }
        public decimal? DeliveryPrice { get; set; }
        public string ShopName { get; set; }
        public bool IsMyShop { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Profit { get; set; }
    }
}