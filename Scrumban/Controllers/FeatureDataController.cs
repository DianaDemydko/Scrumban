using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Services;
using Microsoft.EntityFrameworkCore;
using Scrumban.ServiceLayer.DTO;
using Scrumban.DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Scrumban.DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class FeatureDataController : Controller
    {
        private IFeatureService featureService;
        private IStoryService storyService;
        public FeatureDataController(DbContextOptions<ScrumbanContext> options)
        {
            featureService = new FeatureService(new ScrumbanContext(options));
            storyService = new StoryService( new ScrumbanContext(options) );

        }

        [HttpGet]
        [Authorize]
        [EnableQuery()]
        public IEnumerable<FeatureDTO> Get()
        {
            var result = featureService.Get().ToList();

            for(int i=0;i<result.Count;i++)
            {
                result[i].Stories = storyService.GetStories().Where(story => story.FeatureId == result[i].ID).ToList();
            }
            return result;

        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void Delete([FromBody] FeatureDTO feature)
        {
            var newStories = feature.Stories;
            if (newStories != null){
                for (int i = 0; i < newStories.Count; i++)
                {
                    newStories[i].FeatureId = null;
                    storyService.UpdateStory(newStories[i]);
                }
            }
            featureService.Delete(feature);


        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void Put([FromBody] FeatureDTO feature)
        {
            var newStories = feature.Stories;
            for (int i = 0; i < newStories.Count; i++)
            {
                newStories[i].FeatureId = feature.ID;
                storyService.UpdateStory(newStories[i]);         
            }
            featureService.Put(feature);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void Post([FromBody]FeatureDTO feature)
        {
            featureService.Post(feature);

        }

        [HttpGet]
        [Route("/api/[controller]/getPriorities")]
        public IEnumerable<PriorityDTO> GetPriorities()
        {
            var priorities = featureService.GetPriorities();
            return priorities;
        }
        [HttpGet]
        [Route("/api/[controller]/getAllStories")]
        public IQueryable<StoryDTO> GetAllStories()
        {
           return storyService.GetStories();
        }
        [HttpGet]
        [Route("/api/[controller]/getStates")]
        public IEnumerable<StateDTO> GetStates()
        {
            var states = featureService.GetStates();
            return states;
        }
    }
}