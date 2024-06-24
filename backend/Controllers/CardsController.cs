using backend.Models;
using backend.Models.Requests;
using backend.Models.Responses;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditCardController(ICreditCardService creditCardService) : ControllerBase
    {
        private readonly ICreditCardService _creditCardService = creditCardService;

        [HttpGet]
        public BeResponse<List<CreditCard>> Get()
        {
            try
            {
                var creditCards = _creditCardService.GetCreditCards();
                return new BeResponse<List<CreditCard>>
                {
                    isSuccess = true,
                    statusCode = 200,
                    payload = creditCards
                };
            }
            catch (Exception)
            {
                return new BeResponse<List<CreditCard>>
                {
                    isSuccess = false,
                    statusCode = 500,
                    message = "An error occurred while retrieving credit cards."
                };
            }
        }

        [HttpGet("filter")]
        public BeResponse<List<CreditCard>> FilterCreditCards(bool? isBlocked, string? cardNumber, int? bankCode)
        {
            try
            {
                var filteredCreditCards = _creditCardService.GetFilteredCreditCards(isBlocked, cardNumber, bankCode);
                return new BeResponse<List<CreditCard>>
                {
                    isSuccess = true,
                    statusCode = 200,
                    payload = filteredCreditCards
                };
            }
            catch (Exception)
            {
                return new BeResponse<List<CreditCard>>
                {
                    isSuccess = false,
                    statusCode = 500,
                    message = "An error occurred while filtering credit cards."
                };
            }
        }

        [HttpPost("increase-limit")]
        public BeResponse<CreditCard> IncreaseCreditLimit([FromBody] IncreaseCreditLimitRequest request)
        {
            try
            {
                var result = _creditCardService.IncreaseCreditLimit(request);
                if (result == null)
                {
                    return new BeResponse<CreditCard>
                    {
                        isSuccess = false,
                        statusCode = 403,
                        message = "Credit limit increase request denied."
                    };
                }

                return new BeResponse<CreditCard>
                {
                    isSuccess = true,
                    statusCode = 200,
                    payload = result
                };
            }
            catch (Exception)
            {
                return new BeResponse<CreditCard>
                {
                    isSuccess = false,
                    statusCode = 500,
                    message = "An error occurred while processing the credit limit increase request."
                };
            }
        }
    }
}
