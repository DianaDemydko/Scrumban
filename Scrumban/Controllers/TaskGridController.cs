using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using Scrumban.TaskModel.Models; 
using Microsoft.EntityFrameworkCore;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class TaskGridController : Controller
    {
        ScrumbanContext db;
        IRepository _repo;

        public TaskGridController(ScrumbanContext context)
        {
            db = context;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
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

        [HttpGet]
        [Route("/api/[controller]/getTasks")]
        public IEnumerable<TaskModel.Models.Task> Tasks()
        {
            return db.Tasks.Include(x => x.TaskState).Include(x => x.Priority).ToList();
        }

        [HttpPost]
        [Route("/api/[controller]/addTask")]
        public IActionResult Add([FromBody]TaskModel.Models.Task task)
        {
            TaskModel.Models.Task added = new TaskModel.Models.Task { Name = task.Name, Description = task.Description, PriorityId = task.PriorityId, TaskStateId = task.TaskStateId };
            db.Add(added);
            db.SaveChanges();
            return Ok(task);
        }

        [HttpPost]
        [Route("/api/[controller]/editTask")]
        public IActionResult Edit([FromBody]TaskModel.Models.Task task)
        {
            TaskModel.Models.Task edited = db.Tasks.FirstOrDefault(x => x.Id == task.Id);

            edited.Name = task.Name; 
            edited.Description = task.Description;
            edited.PriorityId = task.PriorityId;
            edited.TaskStateId = task.TaskStateId;
            db.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        //[Route("/api/[controller]/deleteTask")]
        public IActionResult Delete(int id)
        {
            TaskModel.Models.Task task = db.Tasks.FirstOrDefault(x => x.Id == id);
            if(task == null)
            {
                return NotFound();
            }
            db.Tasks.Remove(task);
            db.SaveChanges();
            return Ok(task);
        }
    }
}
