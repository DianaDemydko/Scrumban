using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using Scrumban.SeviceLayer.Entities.DTO;
using Scrumban.SeviceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Scrumban.SeviceLayer.Sevices
{
    public class UserService: IUserService
    {
        private IUnitOfWork _unitOfWork;
        public UserService(DbContextOptions<ScrumbanContext> options)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));
        }
     
        public List<UserDTO> GetAllUsers()
        {
            try
            {
                var mapper = new MapperConfiguration(cfg =>
               {
                   cfg.CreateMap<Users, UserDTO>();
               }).CreateMapper();


                //return _unitOfWork.UserRepository.GetAllUsers().ToList();
                return mapper.Map<IEnumerable<Users>, List<UserDTO>>(_unitOfWork.UserRepository.GetAllUsers());
            }
            catch
            {
                throw;
            }
        }
        //To Add new user   
        public int AddUser(UserDTO entity)
        {
            try
            {
                Users user = new Users();
                if (entity != null)
                {

                    user.UserID = entity.UserID;
                    user.FirstName = entity.FirstName;
                    user.Surname = entity.Surname;
                    user.Email = entity.Email;
                    user.Password = entity.Password;
                    user.RoleID = entity.RoleID;
                    user.PictureID = entity.PictureID;
                }
                    
                    _unitOfWork.UserRepository.AddUser(user);
                    return 1;
                
                
               
            }
            catch
            {
                throw;
            }
        }
        //To Update user  
        public int UpdateUser(UserDTO entity)
        {
            try
            {
                Users user = new Users();
                if (entity != null)
                {

                    user.UserID = entity.UserID;
                    user.FirstName = entity.FirstName;
                    user.Surname = entity.Surname;
                    user.Email = entity.Email;
                    user.Password = entity.Password;
                    user.RoleID = entity.RoleID;
                    user.PictureID = entity.PictureID;
                }
                _unitOfWork.UserRepository.UpdateUser(user);
                
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a user   
        public UserDTO GetUserData(int id)
        {
            try
            {
                Users user = _unitOfWork.UserRepository.GetUserData(id);
                UserDTO userDTO = new UserDTO
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    Email = user.Email,
                    Password = user.Password,
                    RoleID = user.RoleID,
                    PictureID = user.PictureID
                };
                
                return userDTO;
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
                _unitOfWork.UserRepository.DeleteUser(id);
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To check if user is registered
        public bool CheckAvailability(string email, string password)
        {
            try
            {
                return _unitOfWork.UserRepository.CheckAvailability(email, password);
            }
            catch
            {
                throw;
            }
        }
        //To get user 
        public UserDTO GetUserAccount(string email, string password)
        {
            try
            {
                Users user = _unitOfWork.UserRepository.GetUserAccount(email, password);
                UserDTO userDTO = new UserDTO
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    Email = user.Email,
                    Password = user.Password,
                    RoleID = user.RoleID,
                    PictureID = user.PictureID
                };

                return userDTO;
            }
            catch
            {
                throw;
            }

        }
    }
}
