using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class StoryRepository : BaseRepository<StoryDAL>, IStoryRepository
    {
     
        public StoryRepository(ScrumbanContext dbContext) :base(dbContext)
        {

        }

        public override IQueryable<StoryDAL> GetAll()
        {
            return _dbContext.Stories.Include("StoryState").AsQueryable();
        }

        public override StoryDAL GetByID(int id)
        {
            var storyToGet = _dbContext.Stories.Where(story => story.Story_id == id).Include("StoryState").First();
            return storyToGet;
        }
    }
}