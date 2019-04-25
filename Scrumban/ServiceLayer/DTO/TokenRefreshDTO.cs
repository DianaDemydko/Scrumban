using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.DTO
{
    public class TokenRefreshDTO
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime IssuedTime { get; set; }
        public DateTime ExpiresTime { get; set; }
    }
}
