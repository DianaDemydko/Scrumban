using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class UserRepository: BaseRepository<UsersDAL>, IUserRepository
    {
        public UserRepository(ScrumbanContext context) : base(context)
        {

        }

        public IEnumerable<UsersDAL> GetAllUsers()
        {
            try
            {
                return _dbContext.Set<UsersDAL>();
            }
            catch
            {
                throw;
            }
        }
       
        //To Get the list of Users    
        public List<UsersDAL> GetUsers()
        {
            List<UsersDAL> lstUsers = new List<UsersDAL>();
            lstUsers = (from UsersList in _dbContext.Set<UsersDAL>() select UsersList).ToList();
            return lstUsers;
        }
        //To check if user is registered
        public bool CheckAvailability(string email, string password)
        {
            try
            {
                UsersDAL user = _dbContext.Users.First(user_item => user_item.Email == email);
                string sPassword = user.Password;

                if (user == null || sPassword != password)
                {
                    return false;
                }
                else return true;
            }
            catch
            {
                throw;
            }
        }
        //To get user 
        public UsersDAL GetUserAccount(string email, string password)
        {
            try
            {
                bool checkAvailability = CheckAvailability(email, password);
                if (checkAvailability)
                {
                    UsersDAL user = _dbContext.Users.Include(x => x.Role).First(user_item => user_item.Email == email);
                    return user;
                }
                else return null;
            }
            catch
            {
                throw;
            }

        }


    }
}
