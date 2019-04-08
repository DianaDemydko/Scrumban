using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Scrumban
{
    public class AuthOptions
    {
        public const string ISSUER = "ScrumbanAuthServer"; // token author
        public const string AUDIENCE = "http://localhost:60453/"; // token user (SHOULD BE CHANGED)
        const string KEY = "abahalamaha_secretkey_123";   // secret key for encripting
        public const int LIFETIME = 10; // token lifetime
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}
