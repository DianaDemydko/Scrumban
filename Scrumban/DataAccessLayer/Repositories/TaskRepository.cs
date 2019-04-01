﻿using System;
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
                        StartDate = item.StartDate,
                        FinishDate = item.FinishDate,
                        PriorityId = item.PriorityId,
                        TaskStateId = item.TaskStateId
                    };
                    _context.Add(added);
                    transaction.Commit();
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
                    transaction.Commit();
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

        public IQueryable<Task> GetAll()
        {
            return _context.Tasks.Include(x => x.TaskState).Include(x => x.Priority);
        }
    }
}
