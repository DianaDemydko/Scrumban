using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Models
{
    public class DefectDAL
    {
        public int DefectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public string Priority { get; set; }
        public string Severity { get; set; }
        public int? StoryId { get; set; } = 1;
        public string Status { get; set; }
    }
}
