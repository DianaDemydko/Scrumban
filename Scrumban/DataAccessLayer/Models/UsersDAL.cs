using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Scrumban.DataAccessLayer.Models
{
    public class UsersDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public int RoleId { get; set; } = 1;
        public RoleDAL Role { get; set; }
        
        public PictureDAL Picture { get; set; }
    }
}
