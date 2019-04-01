using Scrumban.BusinessLogicLayer.DTO;
using Scrumban.BusinessLogicLayer.Interfaces;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;

namespace Scrumban.BusinessLogicLayer
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
                cfg.CreateMap<Defect, DefectDTO>();
            }).CreateMapper();
            return mapper.Map<IQueryable<Defect>, List<DefectDTO>>(_unitOfWork.Defects.GetAll()).AsQueryable();
        }

        public DefectDTO GetDefect(int? id)
        {
            if (id == null)
            {

            }
            var defect = _unitOfWork.Defects.Get(id.Value);
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
            Defect defect = new Defect
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
            Defect defect = new Defect
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
        public void Dispose()
        {
            throw new NotImplementedException();
        }

    }
}