using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUserRepository : IBaseRepository<UsersDAL>
    {
        IEnumerable<UsersDAL> GetAllUsers();
        List<UsersDAL> GetUsers();
        //To check if user is registered
        bool CheckAvailability(string email, string password);
        //To get user 
        UsersDAL GetUserAccount(string email, string password);
    }
}

