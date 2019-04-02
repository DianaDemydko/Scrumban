
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.Models.Entities;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {

        IDefectRepository<Defect> Defects { get; }
        IRepository<Story> Stories { get; }
        IRepository<Task> Tasks { get; }

        ISprintRepository SprintRepository { get; }
        ISprintStatusRepository SprintStatusRepository { get; }

        int Save();

        void Dispose();

    }
}
