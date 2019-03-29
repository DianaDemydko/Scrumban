using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinesLogicLayer.DTO
{
    public class StoryDTO
    {
        
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int StoryStateId { get; set; } 
        
        public int PriorityId { get; set; } 

        public int? ProgrammerId { get; set; }
       
        public int TaskId { get; set; }
    }
}
