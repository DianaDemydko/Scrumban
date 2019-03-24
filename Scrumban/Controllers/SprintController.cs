using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scrumban.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Scrumban.DataAccessLayer;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class SprintController : Controller
    {
        private IUnitOfWork _unitOfWork;


        public SprintController(DbContextOptions<ScrumbanContext> options)
        {
            _unitOfWork = new UnitOfWork(new ScrumbanContext(options));
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
                IEnumerable<Sprint> sprints = _unitOfWork.SprintRepository.GetAll();
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
                _unitOfWork.SprintRepository.Create(sprint);
                _unitOfWork.Save();
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
                _unitOfWork.SprintRepository.Delete(id);
                _unitOfWork.Save();
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
                Sprint sprintToUpdate = _unitOfWork.SprintRepository.GetByID(sprint.Sprint_id);

                sprintToUpdate.Name = sprint.Name;
                sprintToUpdate.Description = sprint.Description;
                sprintToUpdate.StartDate = sprint.StartDate;
                sprintToUpdate.EndDate = sprint.EndDate;
                sprintToUpdate.Status = sprint.Status;

                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
