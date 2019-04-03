using Scrumban.ServiceLayer.DTO;
using System.Linq;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IDefectService
    {
        DefectDTO GetDefect(int? id);
        IQueryable<DefectDTO> GetDefects();
        void AddDefect(DefectDTO defectDTO);
        void DeleteDefect(int? id);
        void UpdateDefect(DefectDTO defectDTO);
    }
}
