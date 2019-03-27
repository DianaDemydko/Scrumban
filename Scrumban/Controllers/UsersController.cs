
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using CustomIdentityApp.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        UserDataAccessLayer _userDataAccessLayer;

        public UsersController(DbContextOptions<ScrumbanContext> options)
        {
            _userDataAccessLayer = new UserDataAccessLayer(options);
        }

        //Create user 
        [HttpPost]

        public int Create([FromBody]Users user)
        {
            return _userDataAccessLayer.AddUser(user);
        }

        //Edit user
        [HttpPost]
        [Route("Edit")]
        public int Edit(Users user)
        {
            return _userDataAccessLayer.UpdateUser(user);
        }

        //Delete user
        [HttpGet]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return _userDataAccessLayer.DeleteUser(id);
        }
        //Details about users
        [HttpGet]
        [Route("Details/{id}")]
        public Users Details(int id)
        {
            return _userDataAccessLayer.GetUserData(id);
        }
    }
}
