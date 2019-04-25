using Microsoft.AspNet.OData.Query;

namespace Scrumban.ServiceLayer.DTO
{
    public class DefectDTO
    {
        public int DefectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public string Priority { get; set; }
        public string Severity { get; set; }
        public int? StoryId { get; set; }
        public string Status { get; set; }
    }
}
