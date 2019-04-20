using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TaskChangeHistoryRepository : BaseRepository<TaskChangeHistoryDAL>, ITaskChangeHistoryRepository
    {
        ScrumbanContext _dbContext;

        public TaskChangeHistoryRepository(ScrumbanContext context) : base(context)
        {
            _dbContext = context;
        }

        public override IQueryable<TaskChangeHistoryDAL> GetAll()
        {
            return _dbContext.TaskChangeHistories.Include(x => x.Task).Include(x => x.User).AsQueryable();
        }

        public override void Create(TaskChangeHistoryDAL taskChangeHistory)
        {
            if(taskChangeHistory.DateTime == null)
            {
                taskChangeHistory.DateTime = DateTime.Now;
            }
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    _dbContext.TaskChangeHistories.Add(taskChangeHistory);
                    transaction.Commit();
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }
    }
}
