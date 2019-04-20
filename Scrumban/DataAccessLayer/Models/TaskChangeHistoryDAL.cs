using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Models
{
    public class TaskChangeHistoryDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public string Operation { get; set; }
        public DateTime DateTime { get; set; }

        public int TaskId { get; set; }
        public TaskDAL Task { get; set; }

        public int UserId{ get; set; }
        public UsersDAL User { get; set; }
    }
}
