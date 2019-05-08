namespace Scrumban.DataAccessLayer.Models.JiraEntity
{
    public class GetIssue
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public Fields Fields { get; set; }
    }

    public class Fields
    {
        public string Summary { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
    }

    public class Status
    {
        public string Name { get; set; }
        public StatusCategory StatusCategory { get; set; }
    }
    public class StatusCategory
    {
        public string Name { get; set; }
    }
}
