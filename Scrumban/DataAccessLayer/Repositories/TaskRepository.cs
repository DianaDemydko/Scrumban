using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.Models.Entities;
using Scrumban.DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TaskRepository : IRepository<Task>
    {
        private ScrumbanContext _context;

        public TaskRepository(ScrumbanContext context)
        {
            _context = context;
        }

        public void Create(Task item)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Task added = new Task
                    {
                        Name = item.Name,
                        Description = item.Description,
                        PriorityId = item.PriorityId,
                        TaskStateId = item.TaskStateId
                    };
                    _context.Add(added);
                    _context.SaveChanges();
                }
                catch (Exception ex)
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
                    Task task = _context.Tasks.FirstOrDefault(x => x.Id == id);
                    if (task == null)
                    {

                    }
                    _context.Tasks.Remove(task);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public Task Get(int id)
        {
            return _context.Tasks.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Task item)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Task task = _context.Tasks.FirstOrDefault(x => x.Id == item.Id);
                    if (task == null)
                    {

                    }
                    task.Name = task.Name;
                    task.Description = item.Description;
                    task.PriorityId = item.PriorityId;
                    task.TaskStateId = item.TaskStateId;

                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        IEnumerable<Task> IRepository<Task>.GetAll()
        {
            return _context.Tasks.Include(x => x.TaskState).Include(x => x.Priority).ToList();
        }
    }
}
