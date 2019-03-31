using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.Models;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;

namespace Scrumban.Controllers
{

    [Route("api/[controller]")]
    public class DefectDataController : Controller
    {
        IDefectRepository<Defect> _repo;
        IUnitOfWork _unitOfWork;
        public DefectDataController(ScrumbanContext context)
        {
            _repo = new DefectRepository(context);
            _unitOfWork = new UnitOfWork(context);
        }

        [HttpGet]
        [EnableQuery]
        [Route("/api/[controller]/getDefects")]
        public IEnumerable<Defect> GetDefects() 
        {
            return _unitOfWork.Defects.GetAll();  
        }

        [HttpPost]
        [Route("/api/[controller]/addDefect")]
        public IActionResult Add([FromBody] Defect defect)
        {
            try
            {
                _unitOfWork.Defects.Create(defect);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/[controller]/editDefect")]
        public IActionResult Edit([FromBody]Defect defect)
        {
            try
            {
                _unitOfWork.Defects.Update(defect);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
       // [Route("/api/[controller]/deleteDefect")]
        public IActionResult Delete(int id)
        {
            try
            {
                _unitOfWork.Defects.Delete(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}