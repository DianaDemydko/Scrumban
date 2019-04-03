using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System.Linq;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class FeatureRepository : BaseRepository<FeatureDAL>, IFeatureRepository
    {

        public FeatureRepository(ScrumbanContext context) : base(context)
        {
        }
    }
}