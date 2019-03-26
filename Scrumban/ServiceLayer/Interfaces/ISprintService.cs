using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Scrumban.Models;

namespace Scrumban.ServiceLayer
{
    interface ISprintService
    {
        List<Sprint> GetAll();
        Sprint GetByID(int id);
        List<Sprint> GetbyCondition(Expression<Func<Sprint, bool>> expression);

        void Create(Sprint entity);

        void Delete(int id);
        void Delete(Sprint entity);

        void Update(Sprint entity);

    }
}
