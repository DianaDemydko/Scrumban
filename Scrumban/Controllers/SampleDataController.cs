using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.BusinessLogicLayer;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.Models;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private IFeatureService featureService;

        public SampleDataController(ScrumbanContext context)
        {
            featureService = new FeatureService(context);

        }
        [HttpGet]
        [EnableQuery()]
        public IEnumerable<FeatureDTO> Get()
        {
            return featureService.Get();

        }

        [HttpDelete]
        public void Delete([FromBody] FeatureDTO _feature)
        {
            featureService.Delete(_feature);

        }
        [HttpPut]
        public void Put([FromBody] FeatureDTO feature)
        {
            featureService.Put(feature);

        }

        [HttpPost]
        public void Post([FromBody]FeatureDTO feature)
        {
            featureService.Post(feature);


        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        //  private object repository;

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
    }
}
