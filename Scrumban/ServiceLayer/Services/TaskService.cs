using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.DataAccessLayer.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.BusinessLogicLayer
{
    public class TaskService : ITaskService
    {
        IUnitOfWork _unitOfWork { get; set; }
        IMapper _mapper { get; set; }

        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<TaskDAL, TaskDTO>();
                    cfg.CreateMap<TaskStateDAL, TaskStateDTO>();
                    cfg.CreateMap<PriorityDAL, PriorityDTO>();
                    cfg.CreateMap<PictureDAL, PictureDTO>();
                    cfg.CreateMap<UsersDAL, UserDTO>();
                }
            ).CreateMapper();
        }

        public IQueryable<TaskDTO> GetTasks()
        {
            //var mapper = new MapperConfiguration(cfg => {
            //    cfg.CreateMap<TaskDAL, TaskDTO>();
            //    cfg.CreateMap<TaskStateDAL, TaskStateDTO>();
            //    cfg.CreateMap<PriorityDAL, PriorityDTO>();
            //}).CreateMapper();
            return _mapper.Map<IQueryable<TaskDAL>, List<TaskDTO>>(_unitOfWork.Tasks.GetAll()).AsQueryable();

            //IQueryable<TaskDAL> tasksDAL = _unitOfWork.Tasks.GetAll();
            //IQueryable<TaskDTO> tasksDTO = tasksDAL.Select(taskDAL => _mapper.Map<TaskDTO>(taskDAL));

            //return tasksDTO;
        }

        public TaskDTO GetTask(int id)
        {
            TaskDAL taskDAL = _unitOfWork.Tasks.GetByID(id);
            if (taskDAL == null)
            {
                return null;
            }
            TaskDTO taskDTO = _mapper.Map<TaskDTO>(taskDAL);
            return taskDTO;
            //return new TaskDTO
            //{
            //    Id = task.Id,
            //    Name = task.Name,
            //    Description = task.Description,
            //    StartDate = task.StartDate,
            //    FinishDate = task.FinishDate,
            //    TaskStateId = task.TaskStateId,
            //    PriorityId = task.PriorityId,
            //    ProgrammerId = task.ProgrammerId,
            //    StoryId = task.StoryId
            //};
        }

        public void AddTask(TaskDTO taskDTO)
        {
            TaskDAL taskDAL = _mapper.Map<TaskDAL>(taskDTO);
            //TaskDAL task = new TaskDAL
            //{
            //    Id = taskDTO.Id,
            //    Name = taskDTO.Name,
            //    Description = taskDTO.Description,
            //    StartDate = taskDTO.StartDate,
            //    FinishDate = taskDTO.FinishDate,
            //    TaskStateId = taskDTO.TaskStateId,
            //    PriorityId = taskDTO.PriorityId,
            //    ProgrammerId = taskDTO.ProgrammerId,
            //    StoryId = taskDTO.StoryId
            //};
            _unitOfWork.Tasks.Create(taskDAL);
            _unitOfWork.Save();
        }

        public void DeleteTask(int id)
        {
            _unitOfWork.Tasks.Delete(id);
            _unitOfWork.Save();
        }

        public void UpdateTask(TaskDTO taskDTO)
        {
            TaskDAL taskDAL = _mapper.Map<TaskDAL>(taskDTO);
            //TaskDAL task = new TaskDAL
            //{
            //    Id = taskDTO.Id,
            //    Name = taskDTO.Name,
            //    Description = taskDTO.Description,
            //    StartDate = taskDTO.StartDate,
            //    FinishDate = taskDTO.FinishDate,
            //    TaskStateId = taskDTO.TaskStateId,
            //    PriorityId = taskDTO.PriorityId,
            //    ProgrammerId = taskDTO.ProgrammerId,
            //    StoryId = taskDTO.StoryId
            //};
            _unitOfWork.Tasks.Update(taskDAL);
            _unitOfWork.Save();
        }

        public IEnumerable<TaskStateDTO> GetStates()
        {
            //var mapper = new MapperConfiguration(cfg => {
            //    cfg.CreateMap<TaskStateDAL, TaskStateDTO>();
            //}).CreateMapper();
            //return mapper.Map<IEnumerable<TaskStateDAL>, IEnumerable<TaskStateDTO>>(_unitOfWork.Tasks.GetAllStates());

            IEnumerable<TaskStateDAL> taskStatesDAL = _unitOfWork.Tasks.GetAllStates();
            IEnumerable<TaskStateDTO> taskStatesDTO = taskStatesDAL.Select(taskStateDAL => _mapper.Map<TaskStateDTO>(taskStateDAL));

            return taskStatesDTO;
        }

        public IEnumerable<PriorityDTO> GetPriorities()
        {
            //var mapper = new MapperConfiguration(cfg => {
            //    cfg.CreateMap<PriorityDAL, PriorityDTO>();
            //}).CreateMapper();
            //return _mapper.Map<IEnumerable<PriorityDAL>, IEnumerable<PriorityDTO>>(_unitOfWork.Tasks.GetAllPriorities());
            IEnumerable<PriorityDAL> prioritiesDAL = _unitOfWork.Tasks.GetAllPriorities();
            IEnumerable<PriorityDTO> prioritiesDTO = prioritiesDAL.Select(priorityDAL => _mapper.Map<PriorityDTO>(priorityDAL));

            return prioritiesDTO;
        }
    }
}
