using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Models
{
    public class PictureDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Image { get; set; }

        public int UserId { get; set; }
        public UsersDAL User { get; set; }
    }
}
