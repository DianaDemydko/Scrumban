using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.DataAccessLayer.Models
{
    public class StoryStateDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StoryState_id { get; set; }

        public string Name { get; set; }
    }
}