using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IStoryService
    {
        IQueryable<StoryDTO> GetStories();

        StoryDTO GetStory(int id);

        void CreateStory(StoryDTO entity);

        void DeleteStory(int id);
        void DeleteStory(StoryDTO entity);

        void UpdateStory(StoryDTO entity);
    }
}
