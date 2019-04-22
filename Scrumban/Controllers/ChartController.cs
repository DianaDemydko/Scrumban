using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Services;
using Scrumban.ServiceLayer.Sevices;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class ChartController : Controller
    {
        private ISprintService _sprintService;
        private IStoryService _storyService;

        public ChartController(ISprintService sprintService, IStoryService storyService)
        {
            _sprintService =sprintService;
            _storyService = storyService;
        }
        [HttpGet]
        [Route("GetSprint/{id}")]
        public SprintDTO GetSprint(int id)
        {
            SprintDTO sprint = _sprintService.GetByID(id);
            return sprint;
        }
       
        [HttpGet]
        [Route("GetAllStoriesOfCurrentSprint/{id}")]
        public List<StoryDTO> GetAllStoriesOfCurrentSprint(int id)
        {
            IQueryable<StoryDTO> allStories = _storyService.GetStories();
            List<StoryDTO> storiesOfCurrentSprint = new List<StoryDTO>();
            foreach (StoryDTO story in allStories)
            {
                if (story.sprint_id == id)
                {
                    storiesOfCurrentSprint.Add(story);
                }
            }
            return storiesOfCurrentSprint;
        }
        [HttpGet]
        [Route("GetDoneStoriesOfCurrentSprint/{id}")]
        public List<StoryDTO> GetDoneStoriesOfCurrentSprint(int id)
        {
            IQueryable<StoryDTO> allStories = _storyService.GetStories();
            List<StoryDTO> storiesOfCurrentSprint = new List<StoryDTO>();
            foreach (StoryDTO story in allStories)
            {
                if (story.sprint_id == id && story.StoryState == "Done")
                {
                    storiesOfCurrentSprint.Add(story);
                }
            }
            return storiesOfCurrentSprint;
        }

    }
}

