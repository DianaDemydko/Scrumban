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

        public StoryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;

            var configuration = new MapperConfiguration(config => {
                config.CreateMap<StoryDAL, StoryDTO>()
                .ForMember(dest => dest.StoryState, opt => opt.MapFrom(src => src.StoryState.Name));
                config.CreateMap<StoryDTO, StoryDAL>()
                .ForPath(dest => dest.StoryState, opt => opt.Ignore());
            });
            _mapper = configuration.CreateMapper();
        }

        public IQueryable<StoryDTO> GetStories()
        {
            IQueryable<StoryDAL> storiesDAL = _unitOfWork.StoryRepository.GetAll();
            IQueryable<StoryDTO> storiesDTO = storiesDAL.Select(storyDAL => _mapper.Map<StoryDTO>(storyDAL));

            return storiesDTO;
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
            storyDAL.StoryState_id = _unitOfWork.StoryStateRepository.GetByCondition(story => story.Name == storyDTO.StoryState).StoryState_id;

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
            StoryDAL storyDAL = _mapper.Map<StoryDAL>(storyDTO);
            storyDAL.StoryState_id = _unitOfWork.StoryStateRepository.GetByCondition(story => story.Name == storyDTO.StoryState).StoryState_id;
            _unitOfWork.StoryRepository.Update(storyDAL);
            _unitOfWork.Save();
        }
    }
}
