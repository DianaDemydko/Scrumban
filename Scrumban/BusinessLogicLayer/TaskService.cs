using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Scrumban.BusinessLogicLayer
{
    public class TaskService : ITaskService
    {
        IUnitOfWork _unitOfWork { get; set; }

        public TaskService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public IQueryable<TaskDTO> GetTasks()
        {
            var mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<Task, TaskDTO>();
                cfg.CreateMap<TaskState, TaskStateDTO>();
                cfg.CreateMap<Priority, PriorityDTO>();
            }).CreateMapper();
            return mapper.Map<IQueryable<Task>, List<TaskDTO>>(_unitOfWork.Tasks.GetAll()).AsQueryable();
        }

        public TaskDTO GetTask(int? id)
        {
            if (id == null)
            {

            }
            var task = _unitOfWork.Tasks.Get(id.Value);
            if (task == null)
            {

            }
            return new TaskDTO
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                StartDate = task.StartDate,
                FinishDate = task.FinishDate,
                TaskStateId = task.TaskStateId,
                PriorityId = task.PriorityId,
                ProgrammerId = task.ProgrammerId,
                StoryId = task.StoryId
            };
        }

        public void AddTask(TaskDTO taskDTO)
        {
            if(taskDTO == null)
            {

            }
            Task task = new Task
            {
                Id = taskDTO.Id,
                Name = taskDTO.Name,
                Description = taskDTO.Description,
                StartDate = taskDTO.StartDate,
                FinishDate = taskDTO.FinishDate,
                TaskStateId = taskDTO.TaskStateId,
                PriorityId = taskDTO.PriorityId,
                ProgrammerId = taskDTO.ProgrammerId,
                StoryId = taskDTO.StoryId
            };
            _unitOfWork.Tasks.Create(task);
            _unitOfWork.Save();
        }

        public void DeleteTask(int? id)
        {
            if(id == null)
            {

            }
            _unitOfWork.Tasks.Delete(id.Value);
            _unitOfWork.Save();
        }

        public void UpdateTask(TaskDTO taskDTO)
        {
            if(taskDTO == null)
            {

            }
            Task task = new Task
            {
                Id = taskDTO.Id,
                Name = taskDTO.Name,
                Description = taskDTO.Description,
                StartDate = taskDTO.StartDate,
                FinishDate = taskDTO.FinishDate,
                TaskStateId = taskDTO.TaskStateId,
                PriorityId = taskDTO.PriorityId,
                ProgrammerId = taskDTO.ProgrammerId,
                StoryId = taskDTO.StoryId
            };
            _unitOfWork.Tasks.Update(task);
            _unitOfWork.Save();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
