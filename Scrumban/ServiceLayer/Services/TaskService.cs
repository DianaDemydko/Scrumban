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
                    cfg.CreateMap<TaskChangeHistoryDAL, TaskChangeHistoryDTO>();
                    cfg.CreateMap<IQueryable<TaskChangeHistoryDAL>, List<TaskChangeHistoryDTO>>();
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
        }

        public void AddTask(TaskDTO task)
        {
            TaskDAL taskDAL = _mapper.Map<TaskDAL>(task);
            _unitOfWork.Tasks.Create(taskDAL);
            _unitOfWork.Save();
        }

        public void AddTask(TaskChangeHistoryDTO taskChangeHistory)
        {
            TaskDAL taskDAL = _mapper.Map<TaskDAL>(taskChangeHistory.Task);
            _unitOfWork.Tasks.Create(taskDAL);
            TaskChangeHistoryDTO taskChangeHistoryDTO = new TaskChangeHistoryDTO
            {
                Description = taskChangeHistory.Description,
                Operation = "Created",
                DateTime = DateTime.Now,
                UserId = taskChangeHistory.UserId,
                TaskId = -1
            };
            TaskChangeHistoryDAL taskChangeHistoryDAL = _mapper.Map<TaskChangeHistoryDAL>(taskChangeHistoryDTO);
            taskChangeHistoryDAL.Task = taskDAL;
            _unitOfWork.TaskChangeHistoryRepository.Create(taskChangeHistoryDAL);
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
            _unitOfWork.Tasks.Update(taskDAL);

            _unitOfWork.Save();
        }

        public void UpdateTask(TaskChangeHistoryDTO taskChangeHistory)
        {
            TaskDAL taskDAL = _mapper.Map<TaskDAL>(taskChangeHistory.Task);
            _unitOfWork.Tasks.Update(taskDAL);
            TaskChangeHistoryDTO taskChangeHistoryDTO = new TaskChangeHistoryDTO
            {
                Description = taskChangeHistory.Description,
                Operation = "Updated",
                DateTime = DateTime.Now,
                UserId = taskChangeHistory.UserId,
                TaskId = taskDAL.Id
            };
            TaskChangeHistoryDAL taskChangeHistoryDAL = _mapper.Map<TaskChangeHistoryDAL>(taskChangeHistoryDTO);
            taskChangeHistoryDAL.Task = taskDAL;
            _unitOfWork.TaskChangeHistoryRepository.Create(taskChangeHistoryDAL);
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
