using System;



namespace Scrumban.ServiceLayer.DTO
{
    public class TaskDTO
    {


        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? FinishDate { get; set; } = null;

        public int TaskStateId { get; set; } = 1;
        public TaskStateDTO TaskState { get; set; }

        public int PriorityId { get; set; } = 1;
        public PriorityDTO Priority { get; set; }

        public int? ProgrammerId { get; set; }
        public int? StoryId { get; set; }
    }
}
