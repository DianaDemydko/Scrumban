using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer;

namespace Scrumban.Models
{
    public class UserDataAccessLayer
    {
        ScrumbanContext db;
        public UserDataAccessLayer (DbContextOptions<ScrumbanContext> options)
        {
            db = new ScrumbanContext(options);
        }
        public IEnumerable<Users> GetAllUsers()
        {
            try
            {
                return db.Users.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new employee record     
        public int AddUser(Users user)
        {
            try
            {
                db.Users.Add(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar employee    
        public int UpdateUser(Users user)
        {
            try
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular employee    
        public Users GetUserData(int id)
        {
            try
            {
                Users employee = db.Users.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular employee    
        public int DeleteUser(int id)
        {
            try
            {
                Users emp = db.Users.Find(id);
                db.Users.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Get the list of Users    
        public List<Users> GetUsers()
        {
            List<Users> lstUsers = new List<Users>();
            lstUsers = (from UsersList in db.Users select UsersList).ToList();
            return lstUsers;
        }

    }
}
