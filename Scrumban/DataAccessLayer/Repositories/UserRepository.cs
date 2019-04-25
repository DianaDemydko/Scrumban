using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class UserRepository: BaseRepository<UsersDAL>, IUserRepository
    {
        public UserRepository(ScrumbanContext context) : base(context) { }

        public IQueryable<UsersDAL> GetAllUsers()
        {
            try
            {
                return _dbContext.Users.Include(x => x.Role).AsQueryable();
            }
            catch
            {
                throw;
            }
        }
        // Register user
        public override void Create(UsersDAL user)
        {
            user.Password = generatePasswordHash(user.Password);
            PictureDAL picture = new PictureDAL();
            _dbContext.Pictures.Add(picture);
            user.Picture = picture;
            _dbContext.Set<UsersDAL>().Add(user);
        }

        public override UsersDAL GetByID(int id)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(x => x.Id == id);
                var role = _dbContext.Roles.FirstOrDefault(x => x.Id == user.RoleId);
                user.Role = role;
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public override void Update(UsersDAL user)
        {
            UsersDAL oldUser = _dbContext.Users.Find(user.Id);
            if (user.Password != oldUser.Password)
            {
                user.Password = generatePasswordHash(user.Password);
            }
            _dbContext.Entry(oldUser).State = EntityState.Detached;
            _dbContext.Entry(user).State = EntityState.Modified;
        }
        public void PictureUpdate(PictureDAL picture)
        {
            PictureDAL pictureDAL = _dbContext.Pictures.Find(picture.Id);
            pictureDAL.Image = picture.Image;
        }
        //To Get the list of Users    
        public List<UsersDAL> GetUsers()
        {
            List<UsersDAL> lstUsers = new List<UsersDAL>();
            lstUsers = (from UsersList in _dbContext.Set<UsersDAL>() select UsersList).ToList();
            return lstUsers;
        }

        public IEnumerable<RoleDAL> GetRoles()
        {
            return _dbContext.Roles;
        }
        //To check if user is registered
        public bool CheckAvailability(string email, string password)
        {
            try
            {
                UsersDAL user = _dbContext.Users.First(user_item => user_item.Email == email);
                string hashPassword = generatePasswordHash(password);

                if (user == null || hashPassword != user.Password)
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
                //bool checkAvailability = CheckAvailability(email, password);
                UsersDAL user = _dbContext.Users.Include(x => x.Role).Include(x => x.Picture).First(user_item => user_item.Email == email);
                if (user != null && generatePasswordHash(password) == user.Password)
                {
                    return user;
                }
                else return null;
            }
            catch
            {
                throw;
            }
        }


        // generating password hash
        private string generatePasswordHash(string inputPassword)
        {
            SHA512 sha512 = SHA512.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputPassword);
            byte[] hash = sha512.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}
