using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Scrumban.DataAccessLayer;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Sevices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        IUserService _userService;
        private readonly IOptions<JWTAuthentication> _jwtAuthentication;

        public UsersController(DbContextOptions<ScrumbanContext> options, IOptions<JWTAuthentication> jwtAuthentication)
        {
            _userService = new UserService(options, jwtAuthentication);
            _jwtAuthentication = jwtAuthentication ?? throw new ArgumentNullException(nameof(jwtAuthentication));
        }

        //Create user 
        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody]UserDTO user)
        {
            try
            {
                List<UserDTO> list = _userService.GetAllUsers().ToList();
                if (list.Exists(x => x.Email == user.Email))
                {
                    return StatusCode(403);
                }
                else
                {
                    
                   if(_userService.AddUser(user)==1)
                    {
                            return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(404);
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
                    return Ok(user);
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
        [HttpGet("{id}")]
        [Route("Delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (_userService.DeleteUser(id) == 1)
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(401);
            }
            return Ok();
        }

        //Check availability 
        [HttpPost]
        [Route("Check")]
        public IActionResult CheckAvailability([FromBody]UserDTO user)
        {
            try
            {
                bool isAuth = _userService.CheckAvailability(user.Email, user.Password);
                return Ok(isAuth); ;
            }
            catch
            {
                return StatusCode(404);
            }
        }

        [HttpPost]
        [Route("GetUserAccount")]
        public IActionResult GetUseAccount([FromBody]UserDTO user)
        {
            try
            {
                UserDTO response = _userService.GetUserAccount(user.Email, user.Password);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return StatusCode(404);
            }
            
        }

        // JWT generation
        [HttpPost("/api/[controller]/token")]
        [AllowAnonymous]
        public IActionResult getTokens([FromBody]UserDTO login)
        {
            try
            {
                UserDTO userDTO = _userService.GetUserAccount(login.Email, login.Password);
                if (userDTO == null)
                {
                    return StatusCode(401);
                }
                var claims = new[] {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userDTO.Email),
                    new Claim(ClaimTypes.Role, userDTO.Role.Name)
                };
                var tokenExpires = DateTime.Now.Add(TimeSpan.FromMinutes(_jwtAuthentication.Value.Lifetime));
                var token = _userService.createToken(claims, tokenExpires);
                var refreshToken = _userService.createRefreshToken(userDTO.Id, 5);

                var response = new
                {
                    access_token = token,
                    refresh_token = refreshToken,
                    expires = tokenExpires,
                    user = userDTO
                };
                return Ok(response);
            }
            catch(Exception ex)
            {
                return StatusCode(404);
            }
            
        }

        [HttpGet("/api/[controller]/getUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                var list = _userService.GetAllUsers();
                return Ok(list);
            }
            catch(Exception ex)
            {
                return StatusCode(404);
            }
        }

        [HttpGet("/api/[controller]/getRoles")]
        public IActionResult GetRoles()
        {
            try
            {
                var roles = _userService.GetRoles();
                return Ok(roles);
            }
            catch(Exception ex)
            {
                return StatusCode(404);
            }
        }

        [HttpPost("/api/[controller]/updateToken")]
        [AllowAnonymous]
        public IActionResult updateTokens([FromBody]TokenRefreshDTO tokenRefreshDTO)
        {
            try
            {
                if (tokenRefreshDTO.Token == null)
                {
                    return StatusCode(401);
                }
                string refreshToken = _userService.updateTokens(tokenRefreshDTO.Token, tokenRefreshDTO.UserId);
                if (refreshToken == null)
                {
                    return StatusCode(401);
                }

                UserDTO userDTO = _userService.GetUserData(tokenRefreshDTO.UserId);//_userService.GetUserAccount(userDTO.Email, userDTO.Password);
                if (userDTO == null)
                {
                    return StatusCode(401);
                }
                var claims = new[] {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userDTO.Email),
                    new Claim(ClaimTypes.Role, userDTO.Role.Name)
                };
                var tokenExpires = DateTime.Now.Add(TimeSpan.FromMinutes(_jwtAuthentication.Value.Lifetime));
                var token = _userService.createToken(claims, tokenExpires);

                var response = new
                {
                    access_token = token,
                    refresh_token = refreshToken,
                    expires = tokenExpires,
                    user = userDTO
                };
                return Ok(response);
            }
            catch(Exception ex)
            {
                return StatusCode(404);
            }
            
        }
    }
}
