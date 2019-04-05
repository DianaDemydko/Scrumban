using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using Scrumban.ServiceLayer.Entities.DTO;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.Interfaces;

namespace Scrumban.ServiceLayer.Sevices
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
                   cfg.CreateMap<UsersDAL, UserDTO>();
               }).CreateMapper();


                //return _unitOfWork.UserRepository.GetAllUsers().ToList();
                return mapper.Map<IEnumerable<UsersDAL>, List<UserDTO>>(_unitOfWork.UserRepository.GetAllUsers());
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
                UsersDAL user = new UsersDAL();
                if (entity != null)
                {

                    user.Id = entity.Id;
                    user.FirstName = entity.FirstName;
                    user.Surname = entity.Surname;
                    user.Email = entity.Email;
                    user.Password = entity.Password;
                    user.RoleId = entity.RoleId;
                    user.PictureId = entity.PictureId;
                }
                
                _unitOfWork.UserRepository.Create(user);
                _unitOfWork.Save();
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
                UsersDAL user = new UsersDAL();
                if (entity != null)
                {

                    user.Id = entity.Id;
                    user.FirstName = entity.FirstName;
                    user.Surname = entity.Surname;
                    user.Email = entity.Email;
                    user.Password = entity.Password;
                    user.RoleId = entity.RoleId;
                    user.PictureId = entity.PictureId;
                }
                _unitOfWork.UserRepository.Update(user);
                _unitOfWork.Save();
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
                UsersDAL user = _unitOfWork.UserRepository.GetByID(id);
                UserDTO userDTO = new UserDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    PictureId = user.PictureId
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
                _unitOfWork.UserRepository.Delete(id);
                _unitOfWork.Save();
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
                UsersDAL user = _unitOfWork.UserRepository.GetUserAccount(email, password);
                UserDTO userDTO = new UserDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    PictureId = user.PictureId
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
