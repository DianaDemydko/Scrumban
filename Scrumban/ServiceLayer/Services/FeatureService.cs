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

        public FeatureService(ScrumbanContext options)
        {
            _unitOfWork = new UnitOfWork(options);
        }
        public IQueryable<FeatureDTO> Get()
        {
            IQueryable<FeatureDAL> features = _unitOfWork.Feature.GetAll();
            List<FeatureDTO> featureDTOs = new List<FeatureDTO>();
            foreach (var item in features)
            {
                featureDTOs.Add(new FeatureDTO()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Description = item.Description,
                    StateID = item.StateID,
                    State = item.State,
                    OwnerID = item.OwnerID,
                    Owner = item.Owner,
                    Priority = item.Priority,
                    Time = item.Time

                });
            }
            return featureDTOs.AsQueryable();

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
                Priority = feature.Priority,
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
                Priority = feature.Priority,
                Time = feature.Time
            });
            _unitOfWork.Save();
        }
    }
}
