using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrumban.Models;

namespace Scrumban.Controllers
{

    [Route("api/[controller]")]
    public class DefectDataController : Controller
    {
        ScrumbanContext db;
        public DefectDataController(ScrumbanContext context)
        {
            db = context;
        }
        //public DefectDataController(DbContextOptions<ScrumbanContext> options)
        //{
        //    db = new ScrumbanContext(options);
        //}

        //[Route("api/[controller]")]
        [HttpGet]
        public IEnumerable<Defect> Get()
        {
            return db.Defects.ToList();  // db.Defects.Include(x => x.DefectId).Include(x => x.Name).ToList();
        }





        //[Route("api/[controller]/addDefect")]
        [HttpPost]
        public IActionResult Post([FromBody] Defect defect)
        {
            Defect d = new Defect { Name = defect.Name, Description = defect.Description, State = defect.State, Priority = defect.Priority, Severity = defect.Severity, StoryId = defect.StoryId, Status = defect.Status };
            db.Add(d);
            // db.Defects.Add(d);
            db.SaveChanges();
            return Ok(defect);
        }
        [HttpPost]
        [Route("/api/[controller]/editDefect")]
        public IActionResult Edit([FromBody]Defect defect)
        {
            Defect edited = db.Defects.FirstOrDefault(x => x.DefectId == defect.DefectId);

            edited.Name = defect.Name;
            edited.Description = defect.Description;
            edited.State = defect.State;
            edited.Severity = defect.Severity;
            edited.Priority = defect.Priority;
            edited.StoryId = defect.StoryId;
            edited.Status = defect.Status;
            db.SaveChanges();

            return Ok(defect);
        }


        // [Route("api/[controller]/deleteDefect")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Defect defect = db.Defects.FirstOrDefault(x => x.DefectId == id);
            if (defect == null)
            {
                return NotFound();
            }
            db.Defects.Remove(defect);
            db.SaveChanges();
            return Ok(defect);
        }
    }
}