namespace backend.Models.Requests {
      public class IncreaseCreditLimitRequest
    {
        public required string CreditCardNumber { get; set; }
        public decimal RequestedAmount { get; set; }
        public required string Occupation { get; set; }
        public decimal AverageMonthlyIncome { get; set; }
    }
}