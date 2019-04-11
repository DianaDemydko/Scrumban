using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TeamRepository : BaseRepository<TeamDAL>, ITeamRepository
    {
        public TeamRepository(ScrumbanContext dbContext) : base(dbContext)
        {

        }
        public override void Create(TeamDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TeamDAL added = new TeamDAL
                    {
                        TeamID = item.TeamID,
                        Name = item.Name,
                        Project = item.Project
                        
                    };
                    _dbContext.Add(added);
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
            return _dbContext.Teams.Include(x => x.TeamID).Include(x => x.Name).Include(x=>x.Project);
        }

        public override void Delete(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TeamDAL _team = _dbContext.Teams.FirstOrDefault(x => x.TeamID == id);
                    if (_team == null)
                    {

                    }
                    _dbContext.Teams.Remove(_team);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }
        public override void Update(TeamDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    TeamDAL team = _dbContext.Teams.FirstOrDefault(x => x.TeamID == item.TeamID);
                    if (team == null)
                    {
                    }
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
