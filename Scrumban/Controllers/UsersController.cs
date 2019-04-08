using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Scrumban.DataAccessLayer;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Sevices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {

        IUserService _userService;

        public UsersController(DbContextOptions<ScrumbanContext> options)
        {
            _userService = new UserService(options);
        }

        private List<UserDTO> people = new List<UserDTO>
        {
            new UserDTO { Email="admin@gmail.com", Password="12345", Role = new RoleDTO{Id = 2, Name = "Scrum Master" }, RoleId = 2 },
            new UserDTO { Email="qwerty", Password="55555", Role = new RoleDTO{Id = 1, Name = "Team Memeber" }, RoleId = 2}
        };

        [HttpPost("/api/[controller]/token")]
        public IActionResult Token([FromBody]LoginDTO login)
        {
            UserDTO userDTO = _userService.GetUserAccount(login.Login, login.Password);
            if (userDTO == null)
            {
                Response.StatusCode = 400;
                //await Response.WriteAsync("Invalid username & password");
                return StatusCode(401);
            }

            var identity = GetIdentity(userDTO);
            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                user = userDTO
            };

            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(UserDTO user)
        {
            if(user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Name)
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }

        [Authorize]
        [Route("api/[controller]/getLogn")]
        public IActionResult GetLogin()
        {
            return Ok($"Your login: {User.Identity.Name}");
        }

        [Authorize(Roles = "Scrum Master")]
        [Route("api/[controller]/getrole")]
        public IActionResult GetRole()
        {
            return Ok("Ваша роль: Scrum Master");
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
        public UserDTO GetUseAccount([FromBody]LoginDTO user)
        {
            return _userService.GetUserAccount(user.Login, user.Password);
        }
    }
}
