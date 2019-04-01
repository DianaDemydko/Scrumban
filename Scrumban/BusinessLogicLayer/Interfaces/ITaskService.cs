using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.DTO;

namespace Scrumban.BusinessLogicLayer.Interfaces
{
    public interface ITaskService
    {
        TaskDTO GetTask(int? id);
        IQueryable<TaskDTO> GetTasks();
        void AddTask(TaskDTO taskDTO);
        void DeleteTask(int? id);
        void UpdateTask(TaskDTO taskDTO);

        void Dispose();
    }
}
