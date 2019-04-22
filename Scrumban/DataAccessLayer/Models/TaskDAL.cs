 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.DataAccessLayer.Models
{
    public class TaskDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? FinishDate { get; set; } = null;

        [Required]
        public int TaskStateId { get; set; } = 1;
        public TaskStateDAL TaskState { get; set; }

        [Required]
        public int PriorityId { get; set; } = 1;
        public PriorityDAL Priority { get; set; }
        
        public int? StoryId { get; set; }
        public StoryDAL Story { get; set; }

        public int? UserId { get; set; }
        public UsersDAL User { get; set; }
        
        public IEnumerable<TaskChangeHistoryDAL> taskChangeHistories { get; set; }


    }
}
