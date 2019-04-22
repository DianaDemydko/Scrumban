using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.DTO
{
    public class TaskChangeHistoryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Operation { get; set; }
        public DateTime DateTime { get; set; }

        public int TaskId { get; set; }
        public TaskDTO Task { get; set; }

        public int UserId { get; set; }
        public UserDTO User { get; set; }
    }
}
