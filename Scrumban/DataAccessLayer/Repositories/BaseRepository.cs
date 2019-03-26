using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Scrumban.Models;


namespace Scrumban.DataAccessLayer
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity>  where TEntity : class
    {
        protected readonly ScrumbanContext _repositoryContext;

        public BaseRepository(ScrumbanContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        //Get methods

        public virtual IEnumerable<TEntity> GetAll()
        {
            return _repositoryContext.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> GetbyCondition(Expression<Func<TEntity, bool>> expression)
        {
            return _repositoryContext.Set<TEntity>().Where(expression);
        }

        public virtual TEntity GetByID(int id)
        {
            return _repositoryContext.Set<TEntity>().Find(id);
        }

        //Create methods

        public virtual void Create(TEntity entity)
        {
            _repositoryContext.Set<TEntity>().Add(entity);
        }

        //Delete methods

        public virtual void Delete(int id)
        {
            TEntity entityToDelete = _repositoryContext.Set<TEntity>().Find(id);
            _repositoryContext.Set<TEntity>().Remove(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            _repositoryContext.Set<TEntity>().Remove(entityToDelete);
        }

        //Update methods

        public virtual void Update(TEntity entityToUpdate)
        {
            _repositoryContext.Entry(entityToUpdate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}