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
        IFeatureService _featureService;
        IStoryService _storyService;
        public FeatureDataController(IFeatureService featureService, IStoryService storyService)
        {
            _featureService = featureService;
            _storyService = storyService;

        }

        [HttpGet]
        [EnableQuery]
        [Route("Get")]
        public IEnumerable<FeatureDTO> Get()
        {
            var result = _featureService.Get().ToList();

            for(int i=0;i<result.Count;i++)
            {
                result[i].Stories = _storyService.GetStories().Where(story => story.FeatureId == result[i].ID).ToList();
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
                    _storyService.UpdateStory(newStories[i]);
                }
            }
            _featureService.Delete(feature);


        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void Put([FromBody] FeatureDTO feature)
        {
            var newStories = feature.Stories;
            for (int i = 0; i < newStories.Count; i++)
            {
                newStories[i].FeatureId = feature.ID;
                _storyService.UpdateStory(newStories[i]);         
            }
            _featureService.Put(feature);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void Post([FromBody]FeatureDTO feature)
        {
            _featureService.Post(feature);

        }

        [HttpGet]
        [Route("GetPriorities")]
        public IEnumerable<PriorityDTO> GetPriorities()
        {
            var priorities = _featureService.GetPriorities();
            return priorities;
        }
        [HttpGet]
        [Route("GetAllStories")]
        public IQueryable<StoryDTO> GetAllStories()
        {
           return _storyService.GetStories();
        }
        [HttpGet]
        [Route("GetStates")]
        public IEnumerable<StateDTO> GetStates()
        {
            var states = _featureService.GetStates();
            return states;
        }
    }
}