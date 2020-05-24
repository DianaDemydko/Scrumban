namespace Scrumban.ServiceLayer.DTO
{
    public class JiraLoginDTO
    {
        public string Username { get; set; }    
        public string Password { get; set; }

        public string Url { get; set; }
        public string Project { get; set; }
    }
}
