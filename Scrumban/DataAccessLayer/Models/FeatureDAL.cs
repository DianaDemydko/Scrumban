using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scrumban.DataAccessLayer.Models
{
    public class FeatureDAL
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public int? StateID { set; get; }
        public StateDAL State { get; set; }

        public int? OwnerID { set; get; }
        public OwnerDAL Owner { get; set; }
       // public int? ReleaseID { set; get; }
        public int? PriorityID { set; get; }
        public PriorityDAL Priority { get; set; }

        public List<StoryDAL> Stories { set; get; }
        public DateTime Time { set; get; }

        public int? UserId { get; set; }
        public UsersDAL User { get; set; }

    }

}

