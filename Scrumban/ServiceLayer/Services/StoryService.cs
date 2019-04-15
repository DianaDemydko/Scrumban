using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;

namespace Scrumban.ServiceLayer.Services
{
    public class StoryService : IStoryService
    {
        IUnitOfWork _unitOfWork { get; set; }

        public StoryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public StoryDTO GetStory(int? id)
        {
            throw new NotImplementedException();
        }


        //TO DELETE !!!!!!!!!!!!!!!!!!!!!!!!
        public IQueryable<StoryDTO> GetStories() { 
        var mapper = new MapperConfiguration(cfg => {
            cfg.CreateMap<FeatureDAL, FeatureDTO>();
            cfg.CreateMap<StoryDAL, StoryDTO>();
        }).CreateMapper();
            return mapper.Map<IQueryable<StoryDAL>, List<StoryDTO>>(_unitOfWork.Stories.GetAll()).AsQueryable();
        }

        //TO SAVE !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //public IEnumerable<StoryDTO> GetStories()
        //{
        //    var mapper = new MapperConfiguration(cfg => cfg.CreateMap<StoryDTO, StoryDTO>()).CreateMapper();
        //    return mapper.Map<IEnumerable<StoryDAL>, List<StoryDTO>>(_unitOfWork.Stories.GetAll());
        //}
    }
}
