using System.Security.Principal;

namespace backend.Models.Responses
{
    public class LoginResponseData
    {
        public required string token { get; set; }
    }
}