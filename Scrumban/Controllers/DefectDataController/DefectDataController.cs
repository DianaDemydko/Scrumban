using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.Models;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.BusinessLogicLayer.DTO;

namespace Scrumban.Controllers
{

    [Route("api/[controller]")]
    public class DefectDataController : Controller
    {
        //IDefectRepository<Defect> _repo;
        //IUnitOfWork _unitOfWork;
        IDefectService _defectService;
        public DefectDataController(IDefectService defectService/*ScrumbanContext context*/)
        {
            _defectService = defectService;
            //_repo = new DefectRepository(context);
            //_unitOfWork = new UnitOfWork(context);
        }

        [HttpGet]
        [EnableQuery()]
        [Route("/api/[controller]/getDefects")]
        public IQueryable<DefectDTO> GetDefects()
        {
            IQueryable<DefectDTO> defects = _defectService.GetDefects();
            return defects;
        }
        //public IEnumerable<Defect> GetDefects()
        //{
        //    return _unitOfWork.Defects.GetAll();
        //}

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