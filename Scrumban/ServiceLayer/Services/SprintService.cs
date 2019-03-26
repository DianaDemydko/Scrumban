using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.Models;

namespace Scrumban.ServiceLayer
{
    public class SprintService:ISprintService
    {
        private IUnitOfWork _unitOfWork;

        public SprintService(DbContextOptions<ScrumbanContext> options)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));
        }

        public void Create(Sprint entity)
        {
            _unitOfWork.SprintRepository.Create(entity);
            _unitOfWork.Save();
        }

        public void Delete(int id)
        {
            _unitOfWork.SprintRepository.Delete(id);
            _unitOfWork.Save();
        }

        public void Delete(Sprint entity)
        {
            _unitOfWork.SprintRepository.Delete(entity);
            _unitOfWork.Save();
        }

        public List<Sprint> GetAll()
        {
            return _unitOfWork.SprintRepository.GetAll().ToList();
        }

        public List<Sprint> GetbyCondition(Expression<Func<Sprint, bool>> expression)
        {
            return _unitOfWork.SprintRepository.GetbyCondition(expression).ToList();
        }

        public Sprint GetByID(int id)
        {
            return _unitOfWork.SprintRepository.GetByID(id);
        }

        public void Update(Sprint entity)
        {
            _unitOfWork.SprintRepository.Update(entity);
        }
    }
}
