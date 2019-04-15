using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Scrumban.DataAccessLayer.Models
{
    public class StoryDAL
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int StoryStateId { get; set; } = 1;
        public StoryStateDAL StoryState { get; set; }

        public int PriorityId { get; set; } = 2;
        public PriorityDAL Priority { get; set; }

        public int? ProgrammerId { get; set; }
        //public Programmer Programmer { get; set; }

        public int TaskId { get; set; }
        //public Task Task { get; set; }

        public int? FeatureId { get; set; }
        public FeatureDAL Feature { get; set; }


    }
}
