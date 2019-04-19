using System;
using System.Linq;
using Scrumban.DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TaskRepository : BaseRepository<TaskDAL>, ITaskRepository
    {

        public TaskRepository(ScrumbanContext context) : base(context)
        {
        }

        public override void Create(TaskDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TaskDAL added = new TaskDAL
                    {
                        Name = item.Name,
                        Description = item.Description,
                        StartDate = item.StartDate,
                        FinishDate = item.FinishDate,
                        PriorityId = item.PriorityId,
                        TaskStateId = item.TaskStateId
                    };
                    _dbContext.Add(added);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Delete(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TaskDAL task = _dbContext.Tasks.FirstOrDefault(x => x.Id == id);
                    if (task == null)
                    {

                    }
                    _dbContext.Tasks.Remove(task);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override TaskDAL GetByID(int id)
        {
            return _dbContext.Tasks.Include(x => x.Priority).Include( x => x.TaskState).FirstOrDefault(x => x.Id == id);
        }

        public override void Update(TaskDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TaskDAL task = _dbContext.Tasks.FirstOrDefault(x => x.Id == item.Id);
                    if (task == null)
                    {

                    }
                    task.Name = item.Name;
                    task.Description = item.Description;
                    task.StartDate = item.StartDate;
                    task.FinishDate = item.FinishDate;
                    task.PriorityId = item.PriorityId;
                    task.TaskStateId = item.TaskStateId;

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override IQueryable<TaskDAL> GetAll()
        {
            return _dbContext.Tasks.Include(x => x.TaskState).Include(x => x.Priority).AsQueryable();
        }

        public IEnumerable<TaskStateDAL> GetAllStates()
        {
            return _dbContext.TaskStates;
        }

        public IEnumerable<PriorityDAL> GetAllPriorities()
        {
            return _dbContext.Priorities;
        }
    }
}
