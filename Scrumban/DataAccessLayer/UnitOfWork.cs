using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
       private  ScrumbanContext context;
       private FeatureRepository feature_repository;

        public UnitOfWork( ScrumbanContext _scrumbanContext)
        {
            context = _scrumbanContext;
        }
        public FeatureRepository featureRepository
        {
            get
            {
                if (feature_repository == null)
                    feature_repository = new FeatureRepository(context);

                return feature_repository;
            }
        }
        //public FeatureRepository FeatureRepository
        //{
        //    get
        //    {
        //        if (feature_repository == null)
        //        {
        //            feature_repository = new FeatureRepository(context); 
        //        }
        //        return feature_repository;
        //    }
        //}

        public void Save()
        {
            context.SaveChanges();
        }
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


    }
}
