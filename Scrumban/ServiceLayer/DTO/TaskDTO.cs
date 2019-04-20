using System;
using System.Collections.Generic;

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

        public int? UserId { get; set; }
        public UserDTO User { get; set; }

        public int? StoryId { get; set; }
        public StoryDTO Story { get; set; }

        public IEnumerable<TaskChangeHistoryDTO> taskChangeHistories { get; set; }
    }
}
