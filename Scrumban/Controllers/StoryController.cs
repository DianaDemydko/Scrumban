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
using System.Net;
using System.Web.Http;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class StoryController : Controller
    {
        IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet]
        [Route("GetStories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [EnableQuery()]
        public IQueryable<StoryDTO> GetStories()
        {
            
                IQueryable<StoryDTO> stories = _storyService.GetStories();
                return stories;
            }
            catch
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetStory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetStory(int id)
        {
            
            StoryDTO story = _storyService.GetStory(id);
            if (story!=null)
            {
                return Ok(story);
            }
            else
            {
                return NotFound(); ;
            }
            
        }


        [HttpPost]
        [Route("CreateStory")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateStory([FromBody] StoryDTO story)
        {
            try
            {
                _storyService.CreateStory(story);

                return Created(nameof(GetStory), story);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{story_id}")]
        [Route ("/api/[controller]/DeleteStory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteStory( int story_id)
        {
            try
            {
                _storyService.DeleteStory(story_id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("UpdateStory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateStory([FromBody] StoryDTO story)
        {
            try
            {
                _storyService.UpdateStory(story);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
