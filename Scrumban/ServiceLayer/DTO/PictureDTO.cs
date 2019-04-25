using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.DTO
{
    public class PictureDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }

        public int UserId { get; set; }
        public UserDTO User { get; set; }
    }
}
