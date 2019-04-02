using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer
{
    public class UnitOfWork: IUnitOfWork, IDisposable
    {
        private readonly ScrumbanContext _scrumbanContext;
        private IUserRepository _userRepository;

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_scrumbanContext);
                }

                return _userRepository;
            }
        }

       // public IUserRepository UserRepository => throw new NotImplementedException();

        public UnitOfWork(ScrumbanContext scrumbanContext)
        {
            _scrumbanContext = scrumbanContext;

        }

        public int Save()
        {
            return _scrumbanContext.SaveChanges();
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _scrumbanContext.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
