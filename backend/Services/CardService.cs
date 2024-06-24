using backend.Models;
using backend.Models.Requests;
using Microsoft.Extensions.FileProviders;
namespace backend.Services
{
    public interface ICreditCardService
    {
        List<CreditCard> GetCreditCards();
        List<CreditCard> GetFilteredCreditCards(bool? isBlocked, string? cardNumber, int? bankCode);
        CreditCard? IncreaseCreditLimit(IncreaseCreditLimitRequest request);
    }

    public class CreditCardService : ICreditCardService
    {
        private readonly List<CreditCard> _creditCards;
        private readonly IFileProvider _fileProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreditCardService(IFileProvider fileProvider, IHttpContextAccessor httpContextAccessor)
        {
            _fileProvider = fileProvider;
            _httpContextAccessor = httpContextAccessor;
            _creditCards = InitializeMockCreditCards();

        }

        public List<CreditCard> GetCreditCards()
        {
            var _creditCards = InitializeMockCreditCards();
            return _creditCards;
        }

        public List<CreditCard> GetFilteredCreditCards(bool? isBlocked, string? cardNumber, int? bankCode)
        {
            var query = _creditCards.AsQueryable();

            // Apply filters based on the provided parameters
            if (isBlocked.HasValue)
            {
                query = query.Where(card => card.IsBlocked == isBlocked.Value);
            }

            if (!string.IsNullOrEmpty(cardNumber))
            {
                query = query.Where(card => card.CreditCardNumber.Contains(cardNumber));
            }

            if (bankCode.HasValue)
            {
                query = query.Where(card => card.BankCode == bankCode.Value);
            }

            return [.. query];
        }

        public CreditCard? IncreaseCreditLimit(IncreaseCreditLimitRequest request)
        {

            var card = _creditCards.FirstOrDefault(c => c.CreditCardNumber == request.CreditCardNumber);

            if (card == null || card.IsBlocked || request.AverageMonthlyIncome < 12000 || (DateTime.Now - card.DateCreated).TotalDays < 90)
            {
                return null;
            }

            decimal maxAllowedIncrease = 0;

            switch (request.Occupation)
            {
                case "Employee":
                    maxAllowedIncrease = request.AverageMonthlyIncome / 2;
                    break;
                case "Self-employed":
                    maxAllowedIncrease = request.AverageMonthlyIncome / 3;
                    break;
                default:
                    return null; // Occupation not recognized
            }

            if (request.RequestedAmount > 100000 || request.RequestedAmount > maxAllowedIncrease)
            {
                return null;
            }

            // Update the credit limit
            card.CreditLimit = request.RequestedAmount;

            return card;
        }

        private List<CreditCard> InitializeMockCreditCards()
        {
            var context = _httpContextAccessor.HttpContext;
            var scheme = context?.Request.Scheme;
            var host = context?.Request.Host;
            // Construct the path to the image file
            var creditCardImgFilePath = Path.Combine("wwwroot", "assets", "creditCard.png");


            bool isImageExists = !_fileProvider.GetFileInfo(creditCardImgFilePath).Exists;

            var imageUrl = isImageExists ? $"{scheme}://{host}/assets/creditCard.png" : null;

            return
                        [
                new() {
                    CreditCardNumber = "1234567812345678",
                    DateCreated = new DateTime(2021, 6, 15),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = true,
                    CreditLimit = 50000.00m,
                    BankCode = 35
                },
                new() {
                    CreditCardNumber = "8765432187654321",
                    DateCreated = new DateTime(2020, 5, 10),
                    Image = imageUrl,
                    IsBlocked = true,
                    IsDigital = false,
                    CreditLimit = 100000.00m,
                    BankCode = 19
                },
                new() {
                    CreditCardNumber = "1234987654321234",
                    DateCreated = new DateTime(2022, 1, 20),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = true,
                    CreditLimit = 75000.00m,
                    BankCode = 6
                },
                new() {
                    CreditCardNumber = "4321123456781234",
                    DateCreated = new DateTime(2019, 8, 5),
                    Image = imageUrl,
                    IsBlocked = true,
                    IsDigital = false,
                    CreditLimit = 25000.00m,
                    BankCode = 5
                },
                new() {
                    CreditCardNumber = "5678123412348765",
                    DateCreated = new DateTime(2023, 3, 12),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = true,
                    CreditLimit = 150000.00m,
                    BankCode = 3
                },
                new() {
                    CreditCardNumber = "8765123412344321",
                    DateCreated = new DateTime(2020, 7, 25),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = false,
                    CreditLimit = 30000.00m,
                    BankCode = 9
                },
                new() {
                    CreditCardNumber = "4321876543211234",
                    DateCreated = new DateTime(2018, 11, 30),
                    Image = imageUrl,
                    IsBlocked = true,
                    IsDigital = true,
                    CreditLimit = 60000.00m,
                    BankCode = 11
                },
                new() {
                    CreditCardNumber = "3456123412348765",
                    DateCreated = new DateTime(2021, 2, 14),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = false,
                    CreditLimit = 125000.00m,
                    BankCode = 23
                },
                new() {
                    CreditCardNumber = "6543212345678765",
                    DateCreated = new DateTime(2022, 9, 22),
                    Image = imageUrl,
                    IsBlocked = false,
                    IsDigital = true,
                    CreditLimit = 45000.00m,
                    BankCode = 24
                },
                new() {
                    CreditCardNumber = "5432123456789876",
                    DateCreated = new DateTime(2019, 12, 1),
                    Image = imageUrl,
                    IsBlocked = true,
                    IsDigital = false,
                    CreditLimit = 80000.00m,
                    BankCode = 59
                }
            ];
        }

    }
}
