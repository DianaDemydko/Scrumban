namespace Scrumban.ServiceLayer.DTO
{
    public class StoryDTO
    {
        
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int StoryStateId { get; set; } 
        
        public int PriorityId { get; set; } 

        public int? ProgrammerId { get; set; }
       
        public int TaskId { get; set; }

        public int? FeatueId { get; set; }
        public FeatureDTO Feature { get; set; }
    }
}
