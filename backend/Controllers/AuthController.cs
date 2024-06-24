using backend.Models;
using backend.Models.Requests;
using backend.Models.Responses;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("login")]
        public BeResponse<LoginResponseData?> Login(LoginRequest request)
        {
            try
            {
                // Authenticate user
                var authenticationData = _userService.Authenticate(request.Username, request.Password);

                if (!authenticationData.isAuthonticated || authenticationData.authenticatedUser == null)
                {
                    return new BeResponse<LoginResponseData?>
                    {
                        isSuccess = false,
                        statusCode = 401,
                        message = "Authentication failed",
                        payload = null
                    };
                }

                // Generate JWT token
                var token = _userService.GenerateJwtToken(authenticationData.authenticatedUser);

                // Return token as JSON response
                var loginResponseData = new LoginResponseData { token = token };
                return new BeResponse<LoginResponseData?>
                {
                    isSuccess = true,
                    statusCode = 200,
                    payload = loginResponseData
                };
            }
            catch (Exception)
            {
                return new BeResponse<LoginResponseData?>
                {
                    isSuccess = false,
                    statusCode = 500,
                    message = "An error occurred during login."
                };
            }
        }

        [HttpPost("register")]
        public BeResponse<string> Register(User request)
        {
            try
            {

                // Check if the username is null
                if (string.IsNullOrEmpty(request.Username))
                {
                    return new BeResponse<string>
                    {
                        message = "Username cannot be null or empty",
                        statusCode = 400,
                        isSuccess = false
                    };
                }

                // Check if the username already exists
                if (_userService.Exists(request.Username))
                {
                    return new BeResponse<string>
                    {
                        message = "Username already exists",
                        statusCode = 409,
                        isSuccess = false
                    };
                }

                _userService.Register(request);
                return new BeResponse<string>
                {
                    message = "User created successfully",
                    statusCode = 201,
                    isSuccess = true
                };
            }
            catch (Exception)
            {
                return new BeResponse<string>
                {
                    message = "We have failed to register your user, please try again",
                    statusCode = 500,
                    isSuccess = false
                };
            }
        }
    }
}
