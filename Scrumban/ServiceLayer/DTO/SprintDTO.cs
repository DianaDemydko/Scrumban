using System;

namespace Scrumban.ServiceLayer.DTO
{
    public class SprintDTO
    {
        public int Sprint_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SprintStatus { get; set; }
        public int SprintStatus_id { get; set; }

        public SprintStatusDTO Status { get; set; }

        public int? TeamId { get; set; }
        public string Team { get; set; }
    }
}

