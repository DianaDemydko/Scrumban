using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class StoryGridController : Controller
    {
        ScrumbanContext db;
        IStoryRepository _repo;
        IUnitOfWork _unitOfWork;

        public StoryGridController(ScrumbanContext context)
        {
            db = context;
            _repo = new StoryRepository(context);
            _unitOfWork = new UnitOfWork(context);
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
        [EnableQuery()]
        [Route("/api/[controller]/getStories")]
        public IQueryable<StoryDAL> Stories()
        {
            return _unitOfWork.Stories.GetAll();
        }

        //[HttpGet]
        //[EnableQuery()]
        //[Route("/api/[controller]/getStories")]
        //public IEnumerable<Models.Story> Stories()
        //{
        //    return db.Stories.Include(x => x.StoryState).Include(x => x.Priority).ToList();
        //}

        [HttpPost]
        [Route("/api/[controller]/addStory")]
        public IActionResult Add([FromBody]StoryDAL story)
        {
            StoryDAL added = new StoryDAL { Name = story.Name, Description = story.Description, PriorityId = story.PriorityId, StoryStateId = story.StoryStateId };
            db.Add(added);
            db.SaveChanges();
            return Ok(story);
        }

        [HttpPost]
        [Route("/api/[controller]/editStory")]
        public IActionResult Edit([FromBody]StoryDAL story)
        {
            StoryDAL edited = db.Stories.FirstOrDefault(x => x.Id == story.Id);

            edited.Name = story.Name;
            edited.Description = story.Description;
            edited.PriorityId = story.PriorityId;
            edited.StoryStateId = story.StoryStateId;
            db.SaveChanges();

            return Ok(story);
        }

        [HttpDelete("{id}")]
        //[Route("/api/[controller]/deleteStory")]
        public IActionResult Delete(int id)
        {
            StoryDAL story = db.Stories.FirstOrDefault(x => x.Id == id);
            if (story == null)
            {
                return NotFound();
            }
            db.Stories.Remove(story);
            db.SaveChanges();
            return Ok(story);
        }
    }
}
