using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IStoryService
    {
        StoryDTO GetStory(int? id);
        IEnumerable<StoryDTO> GetStories();

    }
}
