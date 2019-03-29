using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer
{
    public interface IUnitOfWork
    {
        ISprintRepository SprintRepository { get; }
        ISprintStatusRepository SprintStatusRepository { get; }

        int Save();
    }
}
