using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Scrumban.DataAccessLayer
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        //Get methods
        IEnumerable<TEntity> GetAll();
        TEntity GetByID(int id);
        IEnumerable<TEntity> GetbyCondition(Expression<Func<TEntity, bool>> expression);

        //Create methods
        void Create(TEntity entity);

        //Delete methods
        void Delete(int id);
        void Delete(TEntity entity);
    }
}
