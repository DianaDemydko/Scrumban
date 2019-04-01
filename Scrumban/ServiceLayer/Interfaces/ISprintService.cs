using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Scrumban.ServiceLayer.Entities;


namespace Scrumban.ServiceLayer
{
    interface ISprintService
    {
        IQueryable<SprintDTO> GetAllSprints();
        IList<SprintStatusDTO> GetAllStatuses();

        SprintDTO GetByID(int id);

        void Create(SprintDTO entity);

        void Delete(int id);
        void Delete(SprintDTO entity);

        void Update(SprintDTO entity);
    }
}
