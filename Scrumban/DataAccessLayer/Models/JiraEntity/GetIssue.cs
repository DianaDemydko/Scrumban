using System;

namespace Scrumban.DataAccessLayer.Models.JiraEntity
{
    public class GetIssue
    {
        public int Id { get; set; }
        public Fields Fields { get; set; }
    }

    public class Fields
    {
        public DateTime? Created { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
    }

    public class Status
    {
        public string Name { get; set; }
    }
    
}
