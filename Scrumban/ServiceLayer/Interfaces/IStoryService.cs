using Scrumban.ServiceLayer.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IStoryService
    {
        StoryDTO GetStory(int? id);
        //TO DELETE !!!!!!!!!!!!!!!!
        IQueryable<StoryDTO> GetStories();

        //TO SAVE !!!!!!!!!!!!!!!
        //IEnumerable<StoryDTO> GetStories();  
    }
}
