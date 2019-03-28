using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.DTO;

namespace Scrumban.BusinessLogicLayer.Interfaces
{
    public interface ITaskService
    {
        TaskDTO GetTask(int? id);
        IEnumerable<TaskDTO> GetTasks();

        void Dispose();
    }
}
