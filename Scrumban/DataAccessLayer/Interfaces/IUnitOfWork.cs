using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        int Save();
    }
}
