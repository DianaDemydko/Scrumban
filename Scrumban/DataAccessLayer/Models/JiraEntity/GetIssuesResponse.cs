namespace Scrumban.DataAccessLayer.Models
{
    public class GetIssuesResponse
    {
        public Issue[] Issues { get; set; }
    } 
    public class Issue
    {
        public int Id { get; set; }
    }

}
