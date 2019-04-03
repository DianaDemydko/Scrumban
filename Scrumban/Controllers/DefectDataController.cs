using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;

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
        [EnableQuery()]
        [Route("/api/[controller]/getDefects")]
        public IQueryable<DefectDTO> GetDefects()
        {
            IQueryable<DefectDTO> defects = _defectService.GetDefects();
            return defects;
        }

        [HttpPost]
        [Route("/api/[controller]/addDefect")]
        public IActionResult Add([FromBody] DefectDTO defectDTO)
        {
            try
            {
                _defectService.AddDefect(defectDTO);
                return Ok(defectDTO);
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