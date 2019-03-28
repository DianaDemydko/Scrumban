using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models.Entities;
using AutoMapper;

namespace Scrumban.BusinessLogicLayer
{
    public class TaskService : ITaskService
    {
        IUnitOfWork _unitOfWork { get; set; }

        public TaskService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public TaskDTO GetTask(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TaskDTO> GetTasks()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskDTO>()).CreateMapper();
            return mapper.Map<IEnumerable<Task>, List<TaskDTO>>(_unitOfWork.Tasks.GetAll());
        }
    }
}
