﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.SeviceLayer.Entities.DTO
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public int RoleID { get; set; }
        public string Password { get; set; }
        public int PictureID { get; set; }
    }
}
