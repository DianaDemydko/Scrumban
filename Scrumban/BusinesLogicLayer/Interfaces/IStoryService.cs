using Scrumban.BusinesLogicLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinesLogicLayer.Interfaces
{
    public interface IStoryService
    {
        StoryDTO GetStory(int? id);
        IEnumerable<StoryDTO> GetStories();

        void Dispose();
    }
}
