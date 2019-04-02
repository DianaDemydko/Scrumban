
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using CustomIdentityApp.Models;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer;
using Scrumban.SeviceLayer.Interfaces;
using Scrumban.SeviceLayer.Sevices;
using Scrumban.SeviceLayer.Entities.DTO;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        //IUnitOfWork _userDataAccessLayer;
        IUserService _userService;

        public UsersController(DbContextOptions<ScrumbanContext> options)
        {
            _userService = new UserService(options);
        }

        //Create user 
        [HttpPost]
        [Route("Create")]
        public int Create([FromBody]UserDTO user)
        {
            return _userService.AddUser(user);
        }

        //Edit user
        [HttpPost]
        [Route("Edit")]
        public int Edit(UserDTO user)
        {
            return _userService.UpdateUser(user);
        }

        //Delete user
        [HttpGet]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return _userService.DeleteUser(id);
        }
        //Details about users
        [HttpGet]
        [Route("Details/{id}")]
        public UserDTO Details(int id)
        {
            return _userService.GetUserData(id);
        }
        //Check availability 
        [HttpPost]
        [Route("Check")]

        public bool CheckAvailability([FromBody]UserDTO user)
        {
            try
            {
                bool isAuth = _userService.CheckAvailability(user.Email, user.Password);
                return isAuth;

            }
            catch
            {
                return false;
               
            }
            
        }
        [HttpPost]
        [Route("GetUserAccount")]
        public UserDTO GetUseAccount([FromBody]UserDTO user)
        {
            return _userService.GetUserAccount(user.Email, user.Password);
        }
    }
}
