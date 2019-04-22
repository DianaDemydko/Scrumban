using AutoMapper;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.ServiceLayer.Services
{
    public class FeatureService : IFeatureService
    {
        private UnitOfWork _unitOfWork;
        private IMapper mapper;

        public FeatureService(ScrumbanContext options)
        {
            _unitOfWork = new UnitOfWork(options);
             mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<FeatureDAL, FeatureDTO>();
                cfg.CreateMap<FeatureDTO, FeatureDAL>();
                cfg.CreateMap<StateDAL, StateDTO>();
                cfg.CreateMap<PriorityDAL, PriorityDTO>();
                cfg.CreateMap<StoryDAL, StoryDTO>();
                cfg.CreateMap<StoryDTO, StoryDAL>();
            }).CreateMapper();
        }
        public FeatureDTO GetByID(int _id)
        {
            return mapper.Map<FeatureDAL, FeatureDTO>(_unitOfWork.Feature.GetByID(_id));
        }
        public IQueryable<FeatureDTO> Get()
        {
            return mapper.Map<IQueryable<FeatureDAL>, List<FeatureDTO>>(_unitOfWork.Feature.GetAll()).AsQueryable();
        }

        public void Delete(FeatureDTO feature)
        {
            FeatureDAL featureToDelete = new FeatureDAL() { ID = feature.ID };
            _unitOfWork.Feature.Delete(featureToDelete);
            _unitOfWork.Save();
        }
        public void Put(FeatureDTO feature)
        {
            _unitOfWork.Feature.Update(new FeatureDAL()
            {
                ID = feature.ID,
                Name = feature.Name,
                Description = feature.Description,
                StateID = feature.StateID,
                State = feature.State,
                OwnerID = feature.OwnerID,
                Owner = feature.Owner,
                PriorityID = feature.PriorityID,
                Time = feature.Time

            });
            _unitOfWork.Save();
        }

        public void Post(FeatureDTO feature)
        {
            _unitOfWork.Feature.Create(new FeatureDAL()
            {
                ID = feature.ID,
                Name = feature.Name,
                Description = feature.Description,
                StateID = feature.StateID,
                State = feature.State,
                OwnerID = feature.OwnerID,
                Owner = feature.Owner,
                PriorityID = feature.PriorityID,
                Time = feature.Time
            });
            _unitOfWork.Save();
        }

        public IEnumerable<PriorityDTO> GetPriorities()
        {
            var mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<PriorityDAL, PriorityDTO>();
            }).CreateMapper();
            return mapper.Map<IEnumerable<PriorityDAL>, IEnumerable<PriorityDTO>>(_unitOfWork.Feature.GetAllPriorities());
        }
        public IEnumerable<StateDTO> GetStates()
        {
            var mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<StateDAL, StateDTO>();
            }).CreateMapper();
            return mapper.Map<IEnumerable<StateDAL>, IEnumerable<StateDTO>>(_unitOfWork.Feature.GetAllStates());
        }

        //public IQueryable<StoryDTO> GetAllStories()
        //{
        //    var mapper = new MapperConfiguration(cfg => {
        //        cfg.CreateMap<StoryDAL, StoryDTO>();
        //        cfg.CreateMap<StoryDTO, StoryDAL>();
        //    }).CreateMapper();
        //    return mapper.Map<IQueryable<StoryDAL>, IQueryable<StoryDTO>>(_unitOfWork.StoryRepository.GetAll());
        //}
    }
}
