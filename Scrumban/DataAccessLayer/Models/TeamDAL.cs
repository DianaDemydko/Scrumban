
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Scrumban.DataAccessLayer.Models
{
    public class TeamDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TeamID { set; get; }
        public string Name { set; get; }
        public string Project { set; get; }
    }
}
