using Scrumban.ServiceLayer.DTO;

namespace Scrumban.ServiceLayer.Entities.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        public int RoleId { get; set; }
        public RoleDTO Role{get;set;}
        
        public int PictureId { get; set; }
    }
}
