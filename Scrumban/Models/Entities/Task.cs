using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.Models.Entities
{
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? FinishDate { get; set; } = null;

        public int TaskStateId { get; set; } = 1;
        public TaskState TaskState { get; set; }

        public int PriorityId { get; set; } = 1;
        public Priority Priority { get; set; }

        public int? ProgrammerId { get; set; }
        //public Programmer Programmer { get; set; }

        public int? StoryId { get; set; }
        //public Story Story { get; set; }
    }
}
