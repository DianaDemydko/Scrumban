using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinessLogicLayer
{
    interface IFeatureService
    {
        IEnumerable<FeatureDTO> Get();
        void Delete(FeatureDTO feature);
        void Put(FeatureDTO feature);
        void Post(FeatureDTO feature);
    }
}
