using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Scrumban.DataAccessLayer;


namespace Scrumban.DataAccessLayer
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly ScrumbanContext _dbContext;

        public BaseRepository(ScrumbanContext dbContext)
        {
            _dbContext = dbContext;
        }

        //Get methods

        public virtual IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsQueryable();
        }

        public virtual TEntity GetByID(int id)
        {
            return _dbContext.Set<TEntity>().Find(id);
        }

        public TEntity GetByCondition(Expression<Func<TEntity, bool>> condition)
        {
            return _dbContext.Set<TEntity>().First(condition);
        }

        //Create methods

        public virtual void Create(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
        }

        //Delete methods

        public virtual void Delete(int id)
        {
            TEntity entityToDelete = _dbContext.Set<TEntity>().Find(id);
            _dbContext.Set<TEntity>().Remove(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            _dbContext.Set<TEntity>().Remove(entityToDelete);
        }

        //Update methods

        public virtual void Update(TEntity entityToUpdate)
        {
            _dbContext.Entry(entityToUpdate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
