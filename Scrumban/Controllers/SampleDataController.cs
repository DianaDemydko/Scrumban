using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        ScrumbanContext db;
        public SampleDataController(ScrumbanContext context)
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
        public IEnumerable<Models.Task> Tasks()
        {
            //db.Tasks.AddRange(new List<Models.Task>
            //{
            //    new Models.Task{Name = "Task1"},
            //    new Models.Task{Name = "Task2"},
            //    new Models.Task{Name = "Task3"}
            //});

            //db.SaveChanges();

            return db.Tasks.ToList();
        }
    }
}
