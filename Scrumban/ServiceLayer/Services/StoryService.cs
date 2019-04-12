using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;

namespace Scrumban.ServiceLayer.Services
{
    public class StoryService : IStoryService
    {
        IUnitOfWork _unitOfWork { get; set; }
        IMapper _mapper { get; set; }

        public StoryService(DbContextOptions<ScrumbanContext> options)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));

            var configuration = new MapperConfiguration(config => {
                config.CreateMap<StoryDAL, StoryDTO>();
                config.CreateMap<StoryDTO, StoryDAL>();
            });
            _mapper = configuration.CreateMapper();
        }

        public IQueryable<StoryDTO> GetStories()
        {
            IQueryable<StoryDAL> storiesDAL = _unitOfWork.StoryRepository.GetAll();
            IQueryable<StoryDTO> storiesDTO = storiesDAL.Select(storyDAL => _mapper.Map<StoryDTO>(storyDAL));

            return storiesDTO;
        }

        public IEnumerable<StoryStateDTO> GetStates()
        {
            throw new NotImplementedException();
        }

        public StoryDTO GetStory(int id)
        {
            StoryDAL storyDAL = _unitOfWork.StoryRepository.GetByID(id);

            StoryDTO storyDTO = _mapper.Map<StoryDTO>(storyDAL);

            return storyDTO;
        }

        public void CreateStory(StoryDTO storyDTO)
        {
            StoryDAL storyDAL = _mapper.Map<StoryDAL>(storyDTO);
            //storyDAL.StoryState_id = _unitOfWork.StoryStateRepository.GetByCondition()

            _unitOfWork.StoryRepository.Create(storyDAL);
            _unitOfWork.Save();
        }

        public void DeleteStory(int id)
        {
            _unitOfWork.StoryRepository.Delete(id);
            _unitOfWork.Save();
        }

        public void DeleteStory(StoryDTO storyDTO)
        {
            StoryDAL storyDAL = new StoryDAL()
            {
                Story_id = storyDTO.Story_id
            };
            _unitOfWork.StoryRepository.Delete(storyDAL);
            _unitOfWork.Save();
        }

        public void UpdateStory(StoryDTO storyDTO)
        {
            _unitOfWork.StoryRepository.Update(_mapper.Map<StoryDAL>(storyDTO));
            _unitOfWork.Save();
        }
    }
}
