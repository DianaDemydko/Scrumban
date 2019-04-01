using Microsoft.EntityFrameworkCore;
using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class DefectRepository : IDefectRepository<Defect>
    {
        private ScrumbanContext _context;

        public DefectRepository(ScrumbanContext context)
        {
            _context = context;
        }
        //IEnumerable<Defect> IDefectRepository<Defect>.GetAll()
        //{
        //    return _context.Defects.ToList();
        //}
        public IQueryable<Defect> GetAll()
        {
            return _context.Defects.AsQueryable();
        }

        public void Create(Defect item)
        {
                    Defect added = new Defect
                    {
                        Name = item.Name,
                        Description = item.Description,
                        State = item.State,
                        Priority = item.Priority,
                        Severity = item.Severity,
                        StoryId = item.StoryId,
                        Status = item.Status
                    };
                    _context.Add(added);
        }

        public void Delete(int id)
        {
                    Defect defect = _context.Defects.FirstOrDefault(x => x.DefectId == id);
                    if (defect == null)
                    {

                    }
                    _context.Defects.Remove(defect);
        }

        public Defect Get(int id)
        {
            return _context.Defects.FirstOrDefault(x => x.DefectId == id);
        }

        public void Update(Defect item)
        {
                    Defect defect = _context.Defects.FirstOrDefault(x => x.DefectId == item.DefectId);
                    if (defect == null)
                    {

                    }

                    defect.Name = defect.Name;
                    defect.Description = item.Description;
                    defect.State = item.State;
                    defect.Severity = item.Severity;
                    defect.Priority = item.Priority;
                    defect.StoryId = item.StoryId;
                    defect.Status = item.Status;
        }


    }
}

