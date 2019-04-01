using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {

        IDefectRepository<Defect> Defects { get; }
        void Save();
    }
}
        IRepository<Story> Stories { get; }
        void Save();
    }
}

