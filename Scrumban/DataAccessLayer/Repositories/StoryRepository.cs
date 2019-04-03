using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class StoryRepository : BaseRepository<StoryDAL>, IStoryRepository
    {
     
        public StoryRepository(ScrumbanContext context) :base(context)
        {
        }

        public override void Create(StoryDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    StoryDAL added = new StoryDAL
                    {
                        Name = item.Name,
                        Description = item.Description,
                        PriorityId = item.PriorityId,
                        StoryStateId = item.StoryStateId
                    };
                    _dbContext.Add(added);
                    _dbContext.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Delete(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    StoryDAL story = _dbContext.Stories.FirstOrDefault(x => x.Id == id);
                    if (story == null)
                    {

                    }
                    _dbContext.Stories.Remove(story);
                    _dbContext.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override StoryDAL GetByID(int id)
        {
            return _dbContext.Stories.FirstOrDefault(x => x.Id == id);
        }

        public override void Update(StoryDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    StoryDAL story = _dbContext.Stories.FirstOrDefault(x => x.Id == item.Id);
                    if (story == null)
                    {

                    }
                    story.Name = item.Name;
                    story.Description = item.Description;
                    story.PriorityId = item.PriorityId;
                    story.StoryStateId = item.StoryStateId;

                    _dbContext.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

       

         public override IQueryable<StoryDAL> GetAll()
        {
            return _dbContext.Stories.Include(x => x.StoryState).Include(x => x.Priority);
        }
    }
}