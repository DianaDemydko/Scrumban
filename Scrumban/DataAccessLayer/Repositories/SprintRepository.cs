using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.ServiceLayer.Entities;

namespace Scrumban.DataAccessLayer
{
    public class SprintRepository : BaseRepository<SprintDAL>, ISprintRepository
    {
        public SprintRepository(ScrumbanContext dbContext) : base(dbContext)
        {

        }

        public override IEnumerable<SprintDAL> GetAll()
        {
            return _dbContext.Sprints.Include("Status").ToList();
        }

        public override SprintDAL GetByID(int id)
        {
            var sprint = _dbContext.Sprints.Find(id);
            _dbContext.Entry(sprint).Reference("Status").Load();
            return sprint;
        }

        public void Create(SprintDTO sprint)
        {
            int sprintStatus_id = _dbContext.SprintStatuses.First(status => status.StatusName == sprint.SprintStatus).SprintStatus_id;

            SprintDAL sprintDAL = new SprintDAL
            {
                Name = sprint.Name,
                Description = sprint.Description,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                SprintStatus_id = sprintStatus_id
            };

            _dbContext.Sprints.Add(sprintDAL);
        }

        public void Update(SprintDTO sprintDTO)
        {
            var sprintDAL = _dbContext.Sprints.Find(sprintDTO.Sprint_id);
            sprintDAL.Name = sprintDTO.Name;
            sprintDAL.Description = sprintDTO.Description;
            sprintDAL.StartDate = sprintDTO.StartDate;
            sprintDAL.EndDate = sprintDTO.EndDate;

            sprintDAL.SprintStatus_id = _dbContext.SprintStatuses.First(sprintStatus => sprintStatus.StatusName == sprintDTO.SprintStatus).SprintStatus_id;
        }
    }
}
