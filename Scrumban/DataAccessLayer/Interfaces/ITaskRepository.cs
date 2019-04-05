using Scrumban.DataAccessLayer.Models;
using System.Collections.Generic;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface ITaskRepository : IBaseRepository<TaskDAL>
    {
        IEnumerable<TaskStateDAL> GetAllStates();
        IEnumerable<PriorityDAL> GetAllPriorities();
    }

}


