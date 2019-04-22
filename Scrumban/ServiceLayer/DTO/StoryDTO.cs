using System;

namespace Scrumban.ServiceLayer.DTO
{
    public class StoryDTO
    {
        public int Story_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rank { get; set; }
        public string StoryState { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? FeatureId { get; set; }
    }
}