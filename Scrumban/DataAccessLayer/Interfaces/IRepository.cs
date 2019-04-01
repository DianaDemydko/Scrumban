using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        
        IEnumerable<TEntity> GetAll();
        IQueryable<TEntity> GetAll();

        TEntity Get(int id);

        // Create
        void Create(TEntity item);

        // Update
        void Update(TEntity item);

        // Delete
        void Delete(int id);
    }
}
