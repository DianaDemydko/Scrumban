using Scrumban.DataAccessLayer.Models;
using System.Collections.Generic;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IFeatureRepository : IBaseRepository<FeatureDAL>
    {
        IEnumerable<PriorityDAL> GetAllPriorities();
        IEnumerable<StateDAL> GetAllStates();
        IEnumerable<StoryDAL> GetAllStories();

    }
}
