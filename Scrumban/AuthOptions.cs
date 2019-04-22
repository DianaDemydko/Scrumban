using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Scrumban
{
    public static class AuthOptions
    {
        const string KEY = "ababahalamaha_secretkey_123";
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}