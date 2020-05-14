using System;
using System.Linq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TeamRepository : BaseRepository<TeamDAL>, ITeamRepository
    {
        public TeamRepository(ScrumbanContext _dbContext) : base(_dbContext)
        {

        }
        public override void Create(TeamDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    _dbContext.Add(item);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override TeamDAL GetByID(int id)
        {
            return _dbContext.Teams.FirstOrDefault(x => x.TeamID == id);
        }

        public override IQueryable<TeamDAL> GetAll()
        {
            return _dbContext.Teams.Include(x => x.Name).Include(x=>x.Project);
        }

       
        public override void Update(TeamDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TeamDAL team = _dbContext.Teams.FirstOrDefault(x => x.TeamID == item.TeamID);
                    team.Name = item.Name;
                    team.Project = item.Project;
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
