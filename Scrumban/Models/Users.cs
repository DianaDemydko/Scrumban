using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomIdentityApp.Models
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        //[ForeignKey("Roles")]
        public int RoleID { get; set; }
        public string Password { get; set; }
        //[ForeignKey("Pictures")]
        public int PictureID { get; set; }

    }
}
