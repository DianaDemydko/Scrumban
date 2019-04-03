using Scrumban.DataAccessLayer.Models;
using System;

namespace Scrumban.ServiceLayer.DTO
{
    public class FeatureDTO
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public int? StateID { set; get; }
        public StateDAL State { get; set; } 

        public int? OwnerID { set; get; }
        public OwnerDAL Owner { get; set; }
        public int? ReleaseID { set; get; }
        public int? Priority { set; get; }
        //  public List<Story> Stories { set; get; }
        public DateTime Time { set; get; }
    }
}
