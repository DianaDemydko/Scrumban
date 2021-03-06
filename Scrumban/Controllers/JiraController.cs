﻿using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.Controllers
{
    public class JiraController : Controller
    {
        IJiraService _jiraService;
        public JiraController(IJiraService jiraService)
        {
            _jiraService = jiraService;
        }
        
        public async Task<IActionResult> Index([FromBody]JiraLoginDTO login)
        {
            
            var url = login.Url;
            var username = login.Username;
            var password = login.Password;
            var project = login.Project;
            try
            {
                var response = await _jiraService.GetIssueResponse(url, username, password, project);
                
            return  Ok();
            }
            catch
            {
                return StatusCode(404);
            }
        }
    }
}