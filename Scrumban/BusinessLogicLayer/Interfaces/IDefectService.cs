using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.BusinessLogicLayer.Interfaces
{
    public interface IDefectService
    {
        DefectDTO GetDefect(int? id);
        IQueryable<DefectDTO> GetDefects();
        void AddDefect(DefectDTO defectDTO);
        void DeleteDefect(int? id);
        void UpdateDefect(DefectDTO defectDTO);

        void Dispose();
    }
}
