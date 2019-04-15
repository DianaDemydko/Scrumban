using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Scrumban.DataAccessLayer.Models
{
    public class StoryDAL
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Story_id { get; set; }

        [ForeignKey("StoryState")]
        public int StoryState_id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Rank { get; set; }


        //Navigation properties
        public StoryStateDAL StoryState { get; set; }

        public int? FeatureId { get; set; }
        public FeatureDAL Feature { get; set; }


    }
}
