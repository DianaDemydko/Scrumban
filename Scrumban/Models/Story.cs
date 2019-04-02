using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Scrumban.Models.Entities;


namespace Scrumban.Models
{
    public class Story
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int StoryStateId { get; set; } = 1;
        public StoryState StoryState { get; set; }

        public int PriorityId { get; set; } = 2;
        public Priority Priority { get; set; }

        public int? ProgrammerId { get; set; }
        //public Programmer Programmer { get; set; }

        public int TaskId { get; set; }
        //public Task Task { get; set; }


    }
}
