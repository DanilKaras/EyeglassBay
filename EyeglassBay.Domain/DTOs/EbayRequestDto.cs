namespace EyeglassBay.Domain.DTOs
{
    public class EbayRequestDto
    {
        public string SearchString { get; set; }
        public decimal OriginalPrice { get; set; }
        public int Percentage { get; set; }
    }
}