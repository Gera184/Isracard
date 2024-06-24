using backend.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public interface IUserService
    {
        AuthenticatationData Authenticate(string username, string password);
        void Register(User user);
        string GenerateJwtToken(User user);
        bool Exists(string username);
    }

    public class UserService(IOptions<JwtSettings> jwtSettings) : IUserService
    {

        private readonly JwtSettings _jwtSettings = jwtSettings.Value;
        private readonly List<User> _users =
        [
            new User { Username = "user1", Password = "password1" },
            new User { Username = "user2", Password = "password2" }
        ];

        public AuthenticatationData Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);
            var authenticationData = new AuthenticatationData {authenticatedUser = user,  isAuthonticated = user != null ? true : false };
            return authenticationData;
        }

        public void Register(User user)
        {
            _users.Add(user);
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                new Claim(ClaimTypes.Name, user.Username),
                // Add more claims as needed
            ]),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool Exists(string username)
        {
            return _users.Any(x => x.Username == username);
        }
    }

}
