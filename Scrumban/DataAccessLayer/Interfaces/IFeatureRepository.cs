using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer
{
    public interface IFeatureRepository
    {
         IQueryable<Feature> Get();
         void Delete([FromBody] Feature _feature);
         void Put([FromBody] Feature feature);
    }
}
