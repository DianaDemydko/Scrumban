using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using AutoMapper;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using System;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;
using System.Collections.Generic;

namespace Scrumban.ServiceLayer.Sevices
{
    public class UserService: IUserService
    {
        private IUnitOfWork _unitOfWork;
        private readonly IOptions<JWTAuthentication> _jwtAuthentication;
        IMapper _mapper { get; set; }

        public UserService(DbContextOptions<ScrumbanContext> options, IOptions<JWTAuthentication> jwtAuthentication)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));
            _jwtAuthentication = jwtAuthentication ?? throw new ArgumentNullException(nameof(jwtAuthentication));
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<RoleDAL, RoleDTO>();
                cfg.CreateMap<UsersDAL, UserDTO>();
                cfg.CreateMap<PictureDAL, PictureDTO>();
            }
            ).CreateMapper();
        }
     
        public IQueryable<UserDTO> GetAllUsers()
        {
            try
            {
                var res = _mapper.Map<IQueryable<UsersDAL>, List<UserDTO>>(_unitOfWork.UserRepository.GetAllUsers()).AsQueryable();
                return res;
            }
            catch
            {
                throw;
            }
        }
        //To Add new user   
        public int AddUser(UserDTO userEntity)
        {
            try
            {
                UsersDAL user = new UsersDAL();
                PictureDAL picture = new PictureDAL();
                if (userEntity != null)
                {
                    user.Id = userEntity.Id;
                    user.FirstName = userEntity.FirstName;
                    user.Surname = userEntity.Surname;
                    user.Email = userEntity.Email;
                    user.Password = userEntity.Password;
                    user.RoleId = userEntity.RoleId == 0 ? 1 : userEntity.RoleId;
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
        public int UpdateUser(UserDTO user)
        {
            try
            {
                UsersDAL userDAL = _mapper.Map<UsersDAL>(user);
                _unitOfWork.UserRepository.Update(userDAL);
                if(userDAL.Picture != null)
                {
                    userDAL.Picture.User = userDAL;
                    _unitOfWork.UserRepository.PictureUpdate(userDAL.Picture);
                }
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
                UsersDAL userDAL = _unitOfWork.UserRepository.GetByID(id);
                UserDTO userDTO = _mapper.Map<UserDTO>(userDAL);
                //UserDTO userDTO = new UserDTO
                //{
                //    Id = user.Id,
                //    FirstName = user.FirstName,
                //    Surname = user.Surname,
                //    Email = user.Email,
                //    Password = user.Password,
                //    Role = new RoleDTO
                //    {
                //        Id = user.Role.Id,
                //        Name = user.Role.Name
                //    },
                //    RoleId = user.RoleId,
                //};
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
                UsersDAL userDAL = _unitOfWork.UserRepository.GetUserAccount(email, password);
                UserDTO userDTO = _mapper.Map<UserDTO>(userDAL);
                //UserDTO userDTO = new UserDTO
                //{
                //    Id = user.Id,
                //    FirstName = user.FirstName,
                //    Surname = user.Surname,
                //    Email = user.Email,
                //    Password = user.Password,
                //    RoleId = user.RoleId,
                //    Role = new RoleDTO
                //    {
                //        Id = user.Role.Id,
                //        Name = user.Role.Name
                //    },
                //    Picture = new PictureDTO
                //    {
                //        Id = user.Picture.Id,
                //        Image = user.Picture.Image
                //    }
                //};

                return userDTO;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<RoleDTO> GetRoles()
        {
            try
            {
                return _mapper.Map<IEnumerable<RoleDAL>, IEnumerable<RoleDTO>>(_unitOfWork.UserRepository.GetRoles());
            }
            catch
            {
                throw;
            }
            
        }
        
        // get token
        public string createToken(IEnumerable<Claim> claims, DateTime tokenExpire)
        {
            var jwt = new JwtSecurityToken(
                    issuer: _jwtAuthentication.Value.Issuer,
                    audience: _jwtAuthentication.Value.Audience,
                    notBefore: DateTime.Now,
                    claims: claims,
                    expires: tokenExpire,//DateTime.Now.Add(TimeSpan.FromMinutes(_jwtAuthentication.Value.Lifetime)),
                    signingCredentials: _jwtAuthentication.Value.SigningCredentials
                );
            var access_token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return access_token;
        }

        public string createRefreshToken(int userId, int lifetime)
        {
            TokenRefreshDAL tokenRefreshDAL = new TokenRefreshDAL
            {
                UserId = userId,
                Token = Guid.NewGuid().ToString(),
                IssuedTime = DateTime.Now,
                ExpiresTime = DateTime.Now.AddMinutes(lifetime)
            };
            try
            {
                _unitOfWork.TokenRefreshRepository.createRefreshToken(tokenRefreshDAL);
                _unitOfWork.Save();
                return tokenRefreshDAL.Token;
            }
            catch
            {
                throw;
            }
        }

        public string updateTokens(string oldRefreshToken, int userId)
        {
            var checkTokenDAL = new TokenRefreshDAL
            {
                UserId = userId,
                Token = oldRefreshToken
            };

            if (_unitOfWork.TokenRefreshRepository.checkRefreshToken(checkTokenDAL) == true)
            {
                string token = createRefreshToken(userId, 5);
                return token;
            }
            else
            {
                return null;
            }
        }
    }
}
