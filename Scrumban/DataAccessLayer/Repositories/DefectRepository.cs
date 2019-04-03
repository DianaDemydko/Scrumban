using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class DefectRepository : BaseRepository<DefectDAL>, IDefectRepository
    {
       
        public DefectRepository(ScrumbanContext context) : base(context)
        {
         
        }
    }
}

