using Scrumban.DataAccessLayer.Interfaces;
using System;
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

        public DefectService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public IQueryable<DefectDTO> GetDefects()
        {
            var mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<DefectDAL, DefectDTO>();
            }).CreateMapper();
            return mapper.Map<IQueryable<DefectDAL>, List<DefectDTO>>(_unitOfWork.Defects.GetAll()).AsQueryable();
        }

        public DefectDTO GetDefect(int? id)
        {
            if (id == null)
            {

            }
            var defect = _unitOfWork.Defects.GetByID(id.Value);
            if (defect == null)
            {

            }
            return new DefectDTO
            {
                DefectId = defect.DefectId,
                Name = defect.Name,
                Description = defect.Description,
                State = defect.State,
                Severity = defect.Severity,
                Priority = defect.Priority,
                Status = defect.Status
            };
        }

        public void AddDefect(DefectDTO defectDTO)
        {
            if (defectDTO == null)
            {

            }
            DefectDAL defect = new DefectDAL
            {
                DefectId = defectDTO.DefectId,
                Name = defectDTO.Name,
                Description = defectDTO.Description,
                State = defectDTO.State,
                Severity = defectDTO.Severity,
                Priority = defectDTO.Priority,
                Status = defectDTO.Status
            };
            _unitOfWork.Defects.Create(defect);
            _unitOfWork.Save();
        }
        public void DeleteDefect(int? id)
        {
            if (id == null)
            {

            }
            _unitOfWork.Defects.Delete(id.Value);
            _unitOfWork.Save();
        }
        public void UpdateDefect(DefectDTO defectDTO)
        {
            if (defectDTO == null)
            {

            }
            DefectDAL defect = new DefectDAL
            {
                DefectId = defectDTO.DefectId,
                Name = defectDTO.Name,
                Description = defectDTO.Description,
                State = defectDTO.State,
                Severity = defectDTO.Severity,
                Priority = defectDTO.Priority,
                Status = defectDTO.Status
            };
            _unitOfWork.Defects.Update(defect);
            _unitOfWork.Save();
        }

    }
}