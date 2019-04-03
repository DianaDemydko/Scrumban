using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.DataAccessLayer.Repositories;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class SprintStatusRepository : BaseRepository<SprintStatusDAL>, ISprintStatusRepository
    {
        public SprintStatusRepository(ScrumbanContext dbContext) : base(dbContext)
        {

        }
    }
}
