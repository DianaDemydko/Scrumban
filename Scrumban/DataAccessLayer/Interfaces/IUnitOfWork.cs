using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.Models.Entities;


namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {

        IDefectRepository<Defect> Defects { get; }
        IRepository<Story> Stories { get; }
        IRepository<Task> Tasks { get; }
        void Save();
    }
}
