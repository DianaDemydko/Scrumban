using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.Models.Entities;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<Task> Tasks { get; }
        void Save();
    }
}
