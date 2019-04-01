using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.BusinessLogicLayer.DTO;
using AutoMapper.QueryableExtensions;

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

        [HttpGet]
        [EnableQuery()]
        [Route("/api/[controller]/getTasks")]
        public IQueryable<TaskDTO> GetTasks()
        {
            IQueryable<TaskDTO> tasks = _taskServise.GetTasks();
            return tasks;
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpPost]
        [Route("/api/[controller]/addTask")]
        public IActionResult Add([FromBody]TaskDTO taskDTO)
        {
            _taskServise.AddTask(taskDTO);
            return Ok(taskDTO);
        }

        [HttpPost]
        [Route("/api/[controller]/editTask")]
        public IActionResult Edit([FromBody]TaskDTO taskDTO)
        {
            _taskServise.UpdateTask(taskDTO);
            return Ok(taskDTO);
        }

        [HttpDelete("{id}")]
        //[Route("/api/[controller]/deleteTask")]
        public IActionResult Delete(int? id)
        {
            TaskDTO taskDTO = _taskServise.GetTask(id);
            _taskServise.DeleteTask(id);
            return Ok(taskDTO);
        }
    }
}
