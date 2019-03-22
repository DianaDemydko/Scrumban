using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class SprintController : Controller
    {
        SprintDataAccessLayer _sprintDataAccessLayer;

        public SprintController(DbContextOptions<ScrumbanContext> options)
        {
            _sprintDataAccessLayer = new SprintDataAccessLayer(options);
        }

        //Get all sprints
        [HttpGet]
        [Route("Index")]
        [ProducesResponseType(typeof(IEquatable<Sprint>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Index()
        {
            try
            {
                IEnumerable<Sprint> sprints = _sprintDataAccessLayer.GetAllSprints();
                return Ok(sprints);
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
        public IActionResult Create([FromBody] Sprint sprint)
        {
            try
            {
                _sprintDataAccessLayer.AddSprint(sprint);
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
                _sprintDataAccessLayer.DeleteSprint(id);
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
        public IActionResult Edit([FromBody] Sprint sprint)
        {
            try
            {
                _sprintDataAccessLayer.UpdateSprint(sprint);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
