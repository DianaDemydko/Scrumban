using Scrumban.ServiceLayer.DTO;

namespace Scrumban.ServiceLayer.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public int RoleId { get; set; } = 1;
        public RoleDTO Role{get;set;}

        public int? PictureId { get; set; }
        public PictureDTO Picture { get; set; }

        public int? TeamId { get; set; }
        public TeamDTO Team { get; set; }
    }
}
