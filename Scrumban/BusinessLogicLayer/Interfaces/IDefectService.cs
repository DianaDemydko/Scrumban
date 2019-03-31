using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.BusinessLogicLayer.Interfaces
{
    public interface IDefectService
    {
        void Create(Defect defect);
        void Delete(int id);
        //DefectDTO GetDefect(int? id);
        //IEnumerable<DefectDTO> GetDefects();
        //void Dispose();
        //List<DefectDTO> GetAll();
        //DefectDTO GetByID(int id);
        //void Create(DefectDTO entity);
        //void Delete(int id);
        //void Delete(DefectDTO entity);
        //void Update(DefectDTO entity);
    }
}
