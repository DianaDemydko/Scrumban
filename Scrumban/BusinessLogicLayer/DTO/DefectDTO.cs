using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinessLogicLayer.DTO
{
    public class DefectDTO
    {
        public int DefectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public string Priority { get; set; }
        public string Severity { get; set; }
        public int? StoryId { get; set; }
        public string Status { get; set; }
    }
}
