using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.DataAccessLayer.Models
{
    [Table("Sprint")]
    public class SprintDAL
    {
        //Атрибут, що вказує на що дане поле буде PK (Primary Key)
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sprint_id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        //Атрибут, що вказує на що дане поле буде FK (Foreign Key) на таблицю SprintStatus
        [ForeignKey("SprintStatus")]
        public int SprintStatus_id { get; set; }
        
        public virtual SprintStatusDAL Status { get; set; }

        public int? TeamId { get; set; }
        public TeamDAL Team { get; set; }
    }
}
