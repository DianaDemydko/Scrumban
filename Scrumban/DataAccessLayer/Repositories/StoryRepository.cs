using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.Models;
using Scrumban.DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class StoryRepository : IRepository<Story>
    {
        private ScrumbanContext _context;

        public StoryRepository(ScrumbanContext context)
        {
            _context = context;
        }

        public void Create(Story item)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Story added = new Story
                    {
                        Name = item.Name,
                        Description = item.Description,
                        PriorityId = item.PriorityId,
                        StoryStateId = item.StoryStateId
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
                    Story story = _context.Stories.FirstOrDefault(x => x.Id == id);
                    if (story == null)
                    {

                    }
                    _context.Stories.Remove(story);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public Story Get(int id)
        {
            return _context.Stories.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Story item)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Story story = _context.Stories.FirstOrDefault(x => x.Id == item.Id);
                    if (story == null)
                    {

                    }
                    story.Name = item.Name;
                    story.Description = item.Description;
                    story.PriorityId = item.PriorityId;
                    story.StoryStateId = item.StoryStateId;

                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        IEnumerable<Story> IRepository<Story>.GetAll()
        {
            return _context.Stories.Include(x => x.StoryState).Include(x => x.Priority).ToList();
        }
    }
}