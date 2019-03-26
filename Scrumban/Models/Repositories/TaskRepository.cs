using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.Models;
using Scrumban.TaskModel.Models;

namespace Scrumban.Models.Repositories
{
    public class TaskRepository : IRepository<TaskModel.Models.Task>
    {
        private ScrumbanContext _context;

        public TaskRepository(ScrumbanContext context)
        {
            _context = context;
        }

        public void Create(TaskModel.Models.Task item)
        {
            using(var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    TaskModel.Models.Task added = new TaskModel.Models.Task
                    {
                        Name = item.Name,
                        Description = item.Description,
                        PriorityId = item.PriorityId,
                        TaskStateId = item.TaskStateId
                    };
                    _context.Add(added);
                    _context.SaveChanges();
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public void Delete(int id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    TaskModel.Models.Task task = _context.Tasks.FirstOrDefault(x => x.Id == id);
                    if(task == null)
                    {

                    }
                    _context.Tasks.Remove(task);
                    _context.SaveChanges();
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public TaskModel.Models.Task Get(int id)
        {
            return _context.Tasks.FirstOrDefault(x => x.Id == id);
        }

        public void Update(TaskModel.Models.Task item)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    TaskModel.Models.Task task = _context.Tasks.FirstOrDefault(x => x.Id == item.Id);
                    if (task == null)
                    {

                    }
                    task.Name = task.Name;
                    task.Description = item.Description;
                    task.PriorityId =  item.PriorityId;
                    task.TaskStateId = item.TaskStateId;

                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        IEnumerable<TaskModel.Models.Task> IRepository<TaskModel.Models.Task>.GetAll()
        {
            return _context.Tasks.ToList();
        }
    }
}
