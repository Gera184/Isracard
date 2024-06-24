using backend.Models;
using backend.Models.Responses;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BanksController(IBankService bankService) : ControllerBase
    {
        private readonly IBankService _bankService = bankService;

        [HttpGet]
        public BeResponse<List<Bank>> Get()
        {
            try
            {
                var bankList = _bankService.GetBanks();
                return new BeResponse<List<Bank>>
                {
                    isSuccess = true,
                    statusCode = 200,
                    payload = bankList
                };
            }
            catch (Exception)
            {
                return new BeResponse<List<Bank>>
                {
                    isSuccess = false,
                    statusCode = 500,
                    message = "An error occurred while retrieving banks."
                };
            }
        }
    }
}