using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.BusinessLogicLayer
{
    public class DefectService : IDefectService
    {
        IUnitOfWork _unitOfWork { get; set; }

        public DefectService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public void Create(Defect defect)
        {
            _unitOfWork.Defects.Create(defect);
            _unitOfWork.Save();
        }
        public void Delete(int id)
        {
            _unitOfWork.Defects.Delete(id);
            _unitOfWork.Save();
        }
       

        //public void Dispose()
        //{
        //    throw new NotImplementedException();
        //}

        //public DefectDTO GetDefect(int? id)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<DefectDTO> GetDefects()
        //{
        //    var mapper = new MapperConfiguration(cfg => cfg.CreateMap<DefectDTO, DefectDTO>()).CreateMapper();
        //    return mapper.Map<IEnumerable<Defect>, List<DefectDTO>>(_unitOfWork.Defects.GetAll());
        //}
    }
}