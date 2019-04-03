using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Scrumban.DataAccessLayer.Models
{
    public class UsersDAL
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public int RoleID { get; set; }
        public string Password { get; set; }

        public int PictureID { get; set; }

    }
}
