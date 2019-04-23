using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        ITeamService _teamServise;

        public TeamController(ITeamService teamService)
        {
            _teamServise = teamService;
        }

        [HttpGet]
        [EnableQuery()]
        [Route("/api/[controller]/getTeams")]
        public IQueryable<TeamDTO> Get()
        {
            IQueryable<TeamDTO> teams = _teamServise.ReadTeams();
            return teams;
        }

        [HttpPut]
        [Route("/api/[controller]/addTeam")]
        public IActionResult Add([FromBody]TeamDTO teamDTO)
        {
            _teamServise.CreateTeam(teamDTO);
            return Ok(teamDTO);
        }

        [HttpPost]
        [Route("/api/[controller]/editTeam")]
        public IActionResult Edit([FromBody]TeamDTO teamDTO)
        {
            _teamServise.UpdateTeam(teamDTO);
            return Ok(teamDTO);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]TeamDTO teamDTO)
        {
           
            _teamServise.DeleteTeam(teamDTO.TeamID);
            return Ok(teamDTO);
        }
    }
}
