using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;


namespace Scrumban.DataAccessLayer.Models
{
    [Table("Story")]
    public class StoryDAL
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Story_id { get; set; }

        [ForeignKey("StoryState")]
        public int StoryState_id { get; set; }

        [ForeignKey("Sprint")]
        public int sprint_id { get; set; } = 1;

        public int StoryPoints { get; set; } = 10;
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rank { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        //Navigation properties
        public StoryStateDAL StoryState { get; set; }
        public IEnumerable<TaskDAL> Tasks { get; set; }

        public int? FeatureId { get; set; }
        public FeatureDAL Feature { get; set; }

        public int? UserId { get; set; }
        public UsersDAL User { get; set; }
    }
}