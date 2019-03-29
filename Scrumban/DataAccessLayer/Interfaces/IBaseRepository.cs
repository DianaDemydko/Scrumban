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

        //Create methods
        void Create(TEntity entity);

        //Delete methods
        void Delete(int id);
        void Delete(TEntity entity);

        //Update methods
        void Update(TEntity entity);
    }
}
