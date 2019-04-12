using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Models;
using Scrumban.DataAccessLayer.Interfaces;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class StoryStateRepository : BaseRepository<StoryStateDAL>, IStoryStateRepository
    {
        public StoryStateRepository(ScrumbanContext dbContext) : base(dbContext)
        {

        }
    }
}

