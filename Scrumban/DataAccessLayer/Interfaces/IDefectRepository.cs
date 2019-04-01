using Scrumban.BusinessLogicLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IDefectRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();
        TEntity Get(int id);
        void Create(TEntity item);
        void Update(TEntity item);
        void Delete(int id);
    }

}


