using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class FeatureRepository : BaseRepository<FeatureDAL>, IFeatureRepository
    {

        public FeatureRepository(ScrumbanContext context) : base(context)
        {
        }
        public FeatureDAL GetByID(int _id)
        {
            return _dbContext.Features.Include(x => x.Priority).Include(x => x.State).FirstOrDefault(x => x.ID == _id);
        }

        public override IQueryable<FeatureDAL> GetAll()
        {
            var response = _dbContext.Features.Include(x => x.Priority).Include(x => x.State).ToList().AsQueryable();
            return response;
        }
        public IQueryable<PriorityDAL> GetPriorities()
        {
            return _dbContext.Priorities;
        }
        public override void Create(FeatureDAL feature)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    FeatureDAL added = new FeatureDAL
                    {
                        Name = feature.Name,
                        Description = feature.Description,
                        StateID = feature.StateID,
                        OwnerID = feature.OwnerID,
                        PriorityID = feature.PriorityID,
                        Time = feature.Time
                    };
                    _dbContext.Add(added);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Update(FeatureDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    FeatureDAL feature = _dbContext.Features.FirstOrDefault(x => x.ID == item.ID);
                    if (feature == null)
                    {

                    }
                    feature.Name = item.Name;
                    feature.Description = item.Description;
                    feature.StateID = item.StateID;
                    feature.OwnerID = item.OwnerID;
                    feature.PriorityID = item.PriorityID;
                    feature.Time = item.Time;

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Delete(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    FeatureDAL feature = _dbContext.Features.FirstOrDefault(x => x.ID == id);
                    if (feature == null)
                    {

                    }
                    _dbContext.Features.Remove(feature);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public IEnumerable<PriorityDAL> GetAllPriorities()
        {
            return _dbContext.Priorities;
        }
        public IEnumerable<StateDAL> GetAllStates()
        {
            return _dbContext.States;
        }
      
    }
} 