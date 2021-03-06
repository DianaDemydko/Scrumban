﻿using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNet.OData;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace Scrumban.Controllers
{
    [Route("api/[controller]")]
    public class DefectController : Controller
    {
        IDefectService _defectService;
        public DefectController(IDefectService defectService)
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
        [Route("/api/[controller]/deleteDefect/{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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