using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scrumban.DataAccessLayer;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Sevices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

        //Create user 
        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody]UserDTO user)
        {
            try
            {
                if (_userService.AddUser(user) == 1)
                {
                    return StatusCode(401);
                }
            }
            catch(Exception ex)
            {
                return Ok(ex.ToString());
            }
            return Ok();
        }

        //Edit user
        [HttpPost]
        [Route("Edit")]
        public IActionResult Edit([FromBody]UserDTO user)
        {
            try
            {
                if (_userService.UpdateUser(user) == 1)
                {
                    return Ok(_userService.GetUserAccount(user.Email, user.Password));
                }
            }
            catch (Exception ex)
            {
                var e = ex;
                return StatusCode(404);
            }
            return Ok();
        }

        //Delete user
        [HttpGet]
        [Route("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (_userService.DeleteUser(id) == 1)
                {
                    return StatusCode(401);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(401);
            }
            return Ok();
        }

        //Details about users
        //[HttpGet]
        //[Route("Details/{id}")]
        //public UserDTO Details(int id)
        //{
        //    return _userService.GetUserData(id);
        //}

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
            UserDTO response = _userService.GetUserAccount(user.Login, user.Password);
            return response;
        }



        // JWT generation
        [HttpPost("/api/[controller]/token")]
        public IActionResult Token([FromBody]LoginDTO login)
        {
            UserDTO userDTO = _userService.GetUserAccount(login.Login, login.Password);
            if (userDTO == null)
            {
                Response.StatusCode = 400;
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
            if (user != null)
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
    }
}
