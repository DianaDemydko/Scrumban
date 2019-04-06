using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Scrumban
{
    public class AuthOptions
    {
        public const string ISSUER = "ScrumbanAuthServer"; // издатель токена
        public const string AUDIENCE = "http://localhost:60453/"; // потребитель токена
        const string KEY = "abahalamaha_secretkey_123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}
