using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface ITaskService
    {
        TaskDTO GetTask(int id);
        IQueryable<TaskDTO> GetTasks();
        void AddTask(TaskDTO taskDTO);
        void AddTask(TaskChangeHistoryDTO taskChangeHistory);
        void DeleteTask(int id);
        void UpdateTask(TaskDTO taskDTO);
        void UpdateTask(TaskChangeHistoryDTO taskChangeHistory);

        IEnumerable<TaskStateDTO> GetStates();
        IEnumerable<PriorityDTO> GetPriorities();
    }
}
