using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.DTO
{
    public class TeamDTO
    {
        public int TeamID { get; set; }
        public string Name { get; set; }
        public string Project { get; set; }
    }
}
