using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using Scrumban.Models;

namespace Scrumban.DataAccessLayer
{
    public class UnitOfWork: IUnitOfWork, IDisposable
    {
        private readonly ScrumbanContext _scrumbanContext;
        private ISprintRepository _sprintRepository;
        
        public ISprintRepository SprintRepository
        {
            get
            {
                if (_sprintRepository == null)
                {
                    _sprintRepository = new SprintRepository(_scrumbanContext);
                }

                return _sprintRepository;
            }
        }

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
