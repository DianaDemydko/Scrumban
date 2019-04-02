using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinessLogicLayer
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
            IQueryable<Feature> features = _unitOfWork.featureRepository.Get();
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
            Feature featureToDelete = new Feature() { ID = feature.ID };
            _unitOfWork.featureRepository.Delete(featureToDelete);
        }
        public void Put(FeatureDTO feature)
        {
            _unitOfWork.featureRepository.Put(new Feature()
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
        }

        public void Post(FeatureDTO feature)
        {
            _unitOfWork.featureRepository.Post(new Feature()
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
        }
    }
}
