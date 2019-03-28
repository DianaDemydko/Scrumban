using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.Models.Entities;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;

namespace Scrumban.Controllers
{
    
    [Route("api/[controller]")]
    public class TaskGridController : Controller
    {
        ScrumbanContext db;
        IRepository<Task> _repo;
        IUnitOfWork _unitOfWork;

        public TaskGridController(ScrumbanContext context)
        {
            db = context;
            _repo = new TaskRepository(context);
            _unitOfWork = new UnitOfWork(context);
        }

        [HttpGet]
        [EnableQuery()]
        [Route("/api/[controller]/getTasks")]
        public IEnumerable<Task> GetTasks()
        {
            return _unitOfWork.Tasks.GetAll();
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

        //[HttpGet]
        //[Route("/api/[controller]/getTasks")]
        ////[EnableQuery]
        //public IEnumerable<Task> Tasks()
        //{
        //    return _unitOfWork.Tasks.GetAll();
        //    //return Ok(_unitOfWork.Tasks.GetAll();
        //    //return _repo.GetAll();
        //    //return db.Tasks.Include(x => x.TaskState).Include(x => x.Priority).ToList();
        //}

        [HttpPost]
        [Route("/api/[controller]/addTask")]
        public IActionResult Add([FromBody]Task task)
        {
            Task added = new Task { Name = task.Name, Description = task.Description, PriorityId = task.PriorityId, TaskStateId = task.TaskStateId };
            db.Add(added);
            db.SaveChanges();
            return Ok(task);
        }

        [HttpPost]
        [Route("/api/[controller]/editTask")]
        public IActionResult Edit([FromBody]Task task)
        {
            Task edited = db.Tasks.FirstOrDefault(x => x.Id == task.Id);

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
            Task task = db.Tasks.FirstOrDefault(x => x.Id == id);
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
