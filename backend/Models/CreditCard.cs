
namespace backend.Models
{
    public class CreditCard
    {
        public required string CreditCardNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Image { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsDigital { get; set; }
        public decimal CreditLimit { get; set; }
        public int BankCode { get; set; }

    }
}
