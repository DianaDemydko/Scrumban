using Microsoft.IdentityModel.Tokens;
using System;

namespace Scrumban
{
    public class JWTAuthentication
    {
        public string Issuer { get; set; }
        public string Audience {get;set;}
        public static string SecurityKey { get;set;}
        public int Lifetime { get; set; }

        public SymmetricSecurityKey SymmetricSecurityKey => new SymmetricSecurityKey(Convert.FromBase64String(SecurityKey));
        public SigningCredentials SigningCredentials => new SigningCredentials(SymmetricSecurityKey, SecurityAlgorithms.HmacSha256);
    }
}
