
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.Models.Entities;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {

        IDefectRepository<Defect> Defects { get; }
        IRepository<Story> Stories { get; }
        IRepository<Scrumban.Models.Entities.Task> Tasks { get; }

        ISprintRepository SprintRepository { get; }
        ISprintStatusRepository SprintStatusRepository { get; }

        int Save();

        void Dispose();

        IUserRepository UserRepository { get; }

    }
}
