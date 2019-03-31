using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {
        IDefectRepository<Defect> Defects { get; }
        void Save();
    }
}