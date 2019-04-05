using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface ITaskService
    {
        TaskDTO GetTask(int? id);
        IQueryable<TaskDTO> GetTasks();
        void AddTask(TaskDTO taskDTO);
        void DeleteTask(int? id);
        void UpdateTask(TaskDTO taskDTO);

        IEnumerable<TaskStateDTO> GetStates();
        IEnumerable<PriorityDTO> GetPriorities();
    }
}
