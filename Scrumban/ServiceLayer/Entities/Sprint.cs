using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.Entities
{
    public class Sprint
    {
        public int Sprint_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public SprintStatus Status { get; set; }

        //Other props
        public TimeSpan Duration
        {
            get
            {
                return EndDate - StartDate;
            }
        }

        //some methods


        public enum SprintStatus
        {
            NotStarted,
            Started,
            Completed,
            Canceled
        }
    }
}
