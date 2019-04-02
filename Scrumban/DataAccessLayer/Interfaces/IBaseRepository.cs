
﻿using CustomIdentityApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity: class
    {
         IEnumerable<TEntity> GetAllUsers();
        //To Add new user   
        int AddUser(TEntity user);
        //To Update user  
        int UpdateUser(TEntity user);
        //Get the details of a user   
        TEntity GetUserData(int id);
        //To Delete the record of a user 
        int DeleteUser(int id);
        //To Get the list of Users    
         List<TEntity> GetUsers();
        //To check if user is registered
        bool CheckAvailability(string email, string password);
        //To get user 
        Users GetUserAccount(string email, string password);
    }
}
