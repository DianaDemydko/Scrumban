using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Scrumban.BusinesLogicLayer.DTO;
using Scrumban.BusinesLogicLayer.Interfaces;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;

namespace Scrumban.BusinesLogicLayer
{
    public class StoryService : IStoryService
    {
        IUnitOfWork _unitOfWork { get; set; }

        public StoryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public StoryDTO GetStory(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<StoryDTO> GetStories()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<StoryDTO, StoryDTO>()).CreateMapper();
            return mapper.Map<IEnumerable<Story>, List<StoryDTO>>(_unitOfWork.Stories.GetAll());
        }
    }
}
