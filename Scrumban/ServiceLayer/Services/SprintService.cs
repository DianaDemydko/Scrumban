using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.Entities;


namespace Scrumban.ServiceLayer
{
    public class SprintService: ISprintService
    {
        private IUnitOfWork _unitOfWork;

        public SprintService(DbContextOptions<ScrumbanContext> options)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));
        }

        public void Create(SprintDTO sprint)
        {
            _unitOfWork.SprintRepository.Create(sprint);
            _unitOfWork.Save();
        }

        public void Delete(int id)
        {
            _unitOfWork.SprintRepository.Delete(id);
            _unitOfWork.Save();
        }

        public void Delete(SprintDTO sprint)
        {
            SprintDAL sprintDAL = new SprintDAL()
            {
                Sprint_id = sprint.Sprint_id
            };
            _unitOfWork.SprintRepository.Delete(sprintDAL);
            _unitOfWork.Save();
        }

        public List<SprintDTO> GetAll()
        {
            List<SprintDAL> sprintsDAL = _unitOfWork.SprintRepository.GetAll().ToList();
            List<SprintDTO> sprintsDTO = new List<SprintDTO>();
            foreach (var item in sprintsDAL)
            {
                sprintsDTO.Add(new SprintDTO()
                {
                    Sprint_id = item.Sprint_id,
                    Name = item.Name,
                    Description = item.Description,
                    StartDate = item.StartDate,
                    EndDate = item.EndDate,
                    SprintStatus = item.Status.StatusName
                });
            }
            return sprintsDTO;
        }

        public IList<SprintStatusDTO> GetAllStatuses()
        {
            var statusesDAL = _unitOfWork.SprintStatusRepository.GetAll();
            List<SprintStatusDTO> statuses = new List<SprintStatusDTO>();
            foreach(var status in statusesDAL)
            {
                statuses.Add(new SprintStatusDTO() { SprintStatus = status.StatusName });
            }
            return statuses;
        }

        public SprintDTO GetByID(int id)
        {
            SprintDAL sprintDAL = _unitOfWork.SprintRepository.GetByID(id);
            SprintDTO sprint = new SprintDTO()
            {
                Sprint_id = sprintDAL.Sprint_id,
                Name = sprintDAL.Name,
                Description = sprintDAL.Description,
                StartDate = sprintDAL.StartDate,
                EndDate = sprintDAL.EndDate,
                SprintStatus = sprintDAL.Status.StatusName
            };
            return sprint;
        }

        public void Update(SprintDTO sprint)
        {
            _unitOfWork.SprintRepository.Update(sprint);
            _unitOfWork.Save();
        }
    }
}
