using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinessLogicLayer.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int? TaskStateId { get; set; }
        public int? PriorityId { get; set; }
        public int? ProgrammerId { get; set; }
        public int? StoryId { get; set; }
    }
}
