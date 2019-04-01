using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Scrumban.DataAccessLayer;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer;
using Scrumban.ServiceLayer.Entities;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class SprintController : Controller
    {
        private ISprintService _sprintService;

        public SprintController(DbContextOptions<ScrumbanContext> options)
        {
            _sprintService = new SprintService(options);
        }

        //Get all sprints
        [HttpGet]
        [EnableQuery]
        [Route("Index")]
        [ProducesResponseType(typeof(IQueryable<SprintDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Index()
        {
            try
            {
                IQueryable<SprintDTO> sprints = _sprintService.GetAllSprints();
                return Ok(sprints);
            }
            catch
            {
                return NotFound();
            }
            
        }

        [HttpGet]
        [Route("GetStatuses")]
        [ProducesResponseType(typeof(IEquatable<SprintStatusDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetStatuses()
        {
            try
            {
                IEnumerable<SprintStatusDTO> statuses = _sprintService.GetAllStatuses();
                return Ok(statuses);
            }
            catch
            {
                return NotFound();
            }
        }

        //Add sprint
        [HttpPost]
        [Route("Create")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] SprintDTO sprint)
        {
            try
            {
                _sprintService.Create(sprint);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        //Delete sprint
        [HttpDelete]
        [Route("Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete([FromBody] int id)
        {
            try
            {
                _sprintService.Delete(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }


        //Edit sprint
        [HttpPut]
        [Route("Edit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit([FromBody] SprintDTO sprint)
        {
            try
            {
                _sprintService.Update(sprint);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
