using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Authorization;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class DefectDataController : Controller
    {
        IDefectService _defectService;
        public DefectDataController(IDefectService defectService)
        {
            _defectService = defectService;
        }

        [HttpGet]
        [Authorize]
        [EnableQuery()]
        [Route("/api/[controller]/getDefects")]
        public IQueryable<DefectDTO> GetDefects()
        {
            IQueryable<DefectDTO> defects = _defectService.GetDefects();
            return defects;
        }

        [HttpPost]
        [Route("/api/[controller]/addDefect")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Add([FromBody] DefectDTO defectDTO)
        {
            try
            {
                _defectService.AddDefect(defectDTO);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/[controller]/editDefect")]
        public IActionResult Edit([FromBody]DefectDTO defectDTO)
        {
            try
            {
                _defectService.UpdateDefect(defectDTO);
                return Ok(defectDTO);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // [Route("/api/[controller]/deleteDefect")]
        public IActionResult Delete(int? id)
        {
            try
            {
                DefectDTO defectDTO = _defectService.GetDefect(id);
                _defectService.DeleteDefect(id);
                return Ok(defectDTO);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}