using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.DataAccessLayer.Models
{
    public class TaskDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? FinishDate { get; set; } = null;

        public int TaskStateId { get; set; } = 1;
        public TaskStateDAL TaskState { get; set; }

        public int PriorityId { get; set; } = 1;
        public PriorityDAL Priority { get; set; }

        public int? ProgrammerId { get; set; }
        //public User User { get; set; }

        public int? StoryId { get; set; }
        //public Story Story { get; set; }
    }
}
