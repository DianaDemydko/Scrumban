using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer
{
    public class FeatureRepository : IFeatureRepository
    {
        ScrumbanContext db;
        public FeatureRepository(ScrumbanContext context)
        {
            db = context;
        }

        public IQueryable<Feature> Get()
        {
            return db.Features.Include(x => x.Owner).Include(y => y.State).AsQueryable();
        }
        public void Delete([FromBody] Feature _feature)
        {
            var feature = db.Features
                .Where(f => f.ID == _feature.ID)
                .FirstOrDefault();

            db.Remove(feature);
            db.SaveChanges();

        }
        public void Put([FromBody] Feature feature)
        {
            var existingFeature = db.Features.Where(f => f.ID == feature.ID)
                                                   .FirstOrDefault<Feature>();

            if (existingFeature != null)
            {
                existingFeature.Name = feature.Name;
                existingFeature.Description = feature.Description;
                existingFeature.Priority = feature.Priority;
                existingFeature.Time = feature.Time;


                db.SaveChanges();
            }
        }
        public void Post([FromBody]Feature feature)
        {
            db.Features.Add(feature);
            db.SaveChanges();

        }


    }
}
