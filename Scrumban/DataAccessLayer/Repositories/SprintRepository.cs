using System.Linq;
using Scrumban.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;

namespace Scrumban.DataAccessLayer.Repositories
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
