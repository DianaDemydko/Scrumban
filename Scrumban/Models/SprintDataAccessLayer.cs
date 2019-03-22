using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.Models
{
    public class SprintDataAccessLayer
    {
        ScrumbanContext dbContext;

        public SprintDataAccessLayer(DbContextOptions<ScrumbanContext> options)
        {
            dbContext = new ScrumbanContext(options);
        }

        public IEnumerable<Sprint> GetAllSprints()
        {
            try
            {
                return dbContext.Sprints.ToList();
            }
            catch
            {
                throw; 
            }
        }

        public void AddSprint(Sprint sprint)
        {
            try
            {
                dbContext.Sprints.Add(sprint);
                dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateSprint(Sprint sprint)
        {
            try
            {
                dbContext.Entry(sprint).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }

        }

        public void DeleteSprint(int id)
        {
            try
            {
                Sprint sprint = dbContext.Sprints.Find(id);
                dbContext.Remove(sprint);
                dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public Sprint GetSprint(int id)
        {
            try
            {
                Sprint sprint = dbContext.Sprints.Find(id);
                return sprint;
            }
            catch
            {
                throw;
            }
        }
    }
}
