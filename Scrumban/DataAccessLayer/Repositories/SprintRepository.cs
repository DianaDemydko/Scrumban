using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.ServiceLayer.Entities;

namespace Scrumban.DataAccessLayer
{
    public class SprintRepository : BaseRepository<SprintDAL>, ISprintRepository
    {
        public SprintRepository(ScrumbanContext dbContext) : base(dbContext)
        {

        }

        public override IQueryable<SprintDAL> GetAll()
        {
            return _dbContext.Sprints.Include("Status").AsQueryable();
        }

        public override SprintDAL GetByID(int id)
        {
            var sprint = _dbContext.Sprints.Find(id);
            _dbContext.Entry(sprint).Reference("Status").Load();
            return sprint;
        }
    }
}
