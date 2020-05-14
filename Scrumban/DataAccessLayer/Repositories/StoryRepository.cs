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
            return _dbContext.Stories.Include("StoryState").Include(x => x.User).ThenInclude(y => y.Picture).AsQueryable();
        }

        public override StoryDAL GetByID(int id)
        {
            var storyToGet = _dbContext.Stories.Where(story => story.Story_id == id).Include("StoryState").Include(x => x.User).ThenInclude(y => y.Picture).First();
            return storyToGet;
        }

        public override void Update(StoryDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    StoryDAL story = _dbContext.Stories.FirstOrDefault(x => x.Story_id == item.Story_id);
                    if (story == null)
                    {

                    }
                    story.Name = item.Name;
                    story.Description = item.Description;
                    story.StoryPoints = item.StoryPoints;
                    story.StoryState_id = item.StoryState_id;
                    story.sprint_id = item.sprint_id;
                    story.Rank = item.Rank;
                    story.StartDate = item.StartDate;
                    story.EndDate = item.EndDate;
                    story.FeatureId = item.FeatureId;
                    story.UserId = item.UserId;

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }
    }
}