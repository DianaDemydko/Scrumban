
﻿using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Repositories
{
    public abstract class BaseUserRepository<TEntity>: IBaseUserRepository<TEntity> where TEntity: class
    {
        protected readonly ScrumbanContext db;
        public BaseUserRepository(DbContextOptions<ScrumbanContext> options)
        {
            db = new ScrumbanContext(options);
        }
        public BaseUserRepository(ScrumbanContext repositoryContext)
        {
            db = repositoryContext;
        }
        public IEnumerable<TEntity> GetAllUsers()
        {
            try
            {
                return db.Set<TEntity>();
            }
            catch
            {
                throw;
            }
        }
        //To Add new user   
        public int AddUser(TEntity entity)
        {
            try
            {
                db.Set<TEntity>().Add(entity);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update user  
        public int UpdateUser(TEntity entity)
        {
            try
            {
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a user   
        public TEntity GetUserData(int id)
        {
            try
            {
                TEntity user = db.Set<TEntity>().Find(id);
                return user;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a user 
        public int DeleteUser(int id)
        {
            try
            {
                TEntity user = db.Set<TEntity>().Find(id);
                db.Set<TEntity>().Remove(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Get the list of Users    
        public List<TEntity> GetUsers()
        {
            List<TEntity> lstUsers = new List<TEntity>();
            lstUsers = (from UsersList in db.Set<TEntity>() select UsersList).ToList();
            return lstUsers;
        }
        //To check if user is registered
        public bool CheckAvailability(string email, string password)
        {
            try
            {
                Users user = db.Users.First(user_item=>user_item.Email == email);
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
        public Users GetUserAccount(string email, string password)
        {
            try
            {
                bool checkAvailability = CheckAvailability(email, password);
                if (checkAvailability)
                {
                    Users user = db.Users.First(user_item => user_item.Email == email);
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

