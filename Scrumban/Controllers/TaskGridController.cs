using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

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

        //"Team Member"
        //"Scrum Master"
        //"Product Owner"
        //"Tester"
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
        [Route("/api/[controller]/addTask")]
        public IActionResult Add([FromBody]TaskDTO taskDTO)
        {
            _taskServise.AddTask(taskDTO);
            return Ok(taskDTO);
        }

        
        [HttpPost]
        [Authorize]
        [Route("/api/[controller]/editTask")]
        public IActionResult Edit([FromBody]TaskDTO taskDTO)
        {
            _taskServise.UpdateTask(taskDTO);
            return Ok(taskDTO);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [Route("/api/[controller]/deleteTask")]
        public IActionResult Delete(int? id)
        {
            TaskDTO taskDTO = _taskServise.GetTask(id);
            _taskServise.DeleteTask(id);
            return Ok(taskDTO);
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
