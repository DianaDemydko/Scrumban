using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    interface IFeatureService
    {
        IQueryable<FeatureDTO> Get();
        void Delete(FeatureDTO feature);
        void Put(FeatureDTO feature);
        void Post(FeatureDTO feature);
        IEnumerable<PriorityDTO> GetPriorities();
        IEnumerable<StateDTO> GetStates();
      //  IQueryable<StoryDTO> GetAllStories();
        FeatureDTO GetByID(int _id);

    }
}
