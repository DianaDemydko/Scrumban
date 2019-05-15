using Scrumban.DataAccessLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.ServiceLayer.Services
{
    public class DefectService : IDefectService
    {
        IUnitOfWork _unitOfWork { get; set; }
        IMapper _mapper { get; set; }

        public DefectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<DefectDAL, DefectDTO>();  
            }
            ).CreateMapper();
        }

        public IQueryable<DefectDTO> GetDefects()
        {
            return _mapper.Map<IQueryable<DefectDAL>, List<DefectDTO>>(_unitOfWork.Defects.GetAll()).AsQueryable();
        }

        public DefectDTO GetDefect(int? id)
        {
            DefectDAL defectDAL = _unitOfWork.Defects.GetByID(id.Value);
            if (defectDAL == null)
            {
                return null;
            }
            DefectDTO defectDTO = _mapper.Map<DefectDTO>(defectDAL);
            return defectDTO;
            
        }

        public void AddDefect(DefectDTO defectDTO)
        {
            DefectDAL defectDAL = _mapper.Map<DefectDAL>(defectDTO);
            _unitOfWork.Defects.Create(defectDAL);
            _unitOfWork.Save();
        }
        public void DeleteDefect(int? id)
        {
            _unitOfWork.Defects.Delete(id.Value);
            _unitOfWork.Save();
        }

        public void UpdateDefect(DefectDTO defectDTO)
        {
            DefectDAL defectDAL = _mapper.Map<DefectDAL>(defectDTO);
            _unitOfWork.Defects.Update(defectDAL);
            _unitOfWork.Save();
        }
    }
}