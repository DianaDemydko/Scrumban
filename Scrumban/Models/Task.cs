using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int StateId { get; set; } = 1;
        public State State { get; set; }

        public int PriorityId { get; set; } = 2;
        public Priority Priority { get; set; }

        public int? ProgrammerId { get; set; }
        //public Programmer Programmer { get; set; }

        public int? StoryId { get; set; }
        //public Story Story { get; set; }

    }
}
