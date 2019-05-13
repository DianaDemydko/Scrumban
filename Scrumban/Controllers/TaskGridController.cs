using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class TaskGridController : Controller
    {
        ITaskService _taskServise;

        public TaskGridController(ITaskService taskService)
        {
            _taskServise = taskService;
        }
        //"Team Member", "Scrum Master", "Product Owner", "Tester"
        [HttpGet]
        [EnableQuery()]
        [Route("/api/[controller]/getTasks")]
        public IQueryable<TaskDTO> GetTasks()
        {
            IQueryable<TaskDTO> tasks = _taskServise.GetTasks();
            
            return tasks;
        }

        [HttpPost]
        [Authorize]
        [Route("/api/[controller]/addTaskDetailed")]
        public IActionResult Add([FromBody]TaskChangeHistoryDTO taskChangeHistoryDTO)
        {
            if (taskChangeHistoryDTO == null)
            {
                return StatusCode(400);
            }
            _taskServise.AddTask(taskChangeHistoryDTO);
            return Ok(taskChangeHistoryDTO);
        }

        [Authorize]
        [Route("/api/[controller]/editTaskDetailed")]
        [HttpPost]
        public IActionResult Edit([FromBody]TaskChangeHistoryDTO taskChangeHistoryDTO)
        {
            if (taskChangeHistoryDTO == null)
            {
                return StatusCode(400);
            }
            _taskServise.UpdateTask(taskChangeHistoryDTO);
            return Ok(taskChangeHistoryDTO.Task);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [Route("/api/[controller]/deleteTask")]
        public IActionResult Delete(int? id)
        {
            if(id == null)
            {
                return StatusCode(400);
            }
            _taskServise.DeleteTask(id.Value);
            return Ok();
        }

        // get additional const tables: states, priorities
        [HttpGet]
        [Route("/api/[controller]/getStates")]
        public IEnumerable<TaskStateDTO> GetStates()
        {
            var states = _taskServise.GetStates();
            return states;
        }

        [HttpGet]
        [Route("/api/[controller]/getPriorities")]
        public IEnumerable<PriorityDTO> GetPriorities()
        {
            var priorities = _taskServise.GetPriorities();
            return priorities;
        }
    }
}
