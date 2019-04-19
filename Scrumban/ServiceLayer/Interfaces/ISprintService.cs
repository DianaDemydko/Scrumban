using System.Collections.Generic;
using System.Linq;
using Scrumban.ServiceLayer.DTO;


namespace Scrumban.ServiceLayer.Interfaces
{
    public interface ISprintService
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
