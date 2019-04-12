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

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class StoryGridController : Controller
    {
        IStoryService _storyService;

        public StoryGridController(DbContextOptions<ScrumbanContext> options)
        {
            _storyService = new StoryService(options);
        }


        [HttpGet]
        [EnableQuery]
        [Route("GetStories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetStories()
        {
            try
            {
                IQueryable<StoryDTO> stories = _storyService.GetStories();
                return Ok(stories);
            }
            catch
            {
                return NotFound();
            }
            
        }

        [HttpPost]
        [Route("CreateStory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult CreateStory([FromBody]StoryDTO story)
        {
            _storyService.CreateStory(story);
            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete(int story_id)
        {
            _storyService.DeleteStory(story_id);
            return Ok();
        }

        [HttpPost]
        [Route("Edit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Edit([FromBody]StoryDTO story)
        {
            _storyService.UpdateStory(story);
            return Ok();
        }

        
    }
}
