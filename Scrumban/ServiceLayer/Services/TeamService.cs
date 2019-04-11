using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Interfaces;
using AutoMapper;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Scrumban.DataAccessLayer.Models;
using AutoMapper.QueryableExtensions;

namespace Scrumban.BusinessLogicLayer
{ 
    public class TeamService : ITeamService
    {
        IUnitOfWork _unitOfWork { get; set; }
        public TeamService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public TeamDTO GetTeam(int? id)
        {
            if (id == null)
            {

            }
            var team = _unitOfWork.TeamRepository.GetByID(id.Value);
            if (team == null)
            {

            }
            return new TeamDTO
            {
                TeamID = team.TeamID,
                Name = team.Name,
                Project = team.Project
            };
        }
        public IQueryable<TeamDTO> GetTeams()
        {
            var mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<TeamDAL, TeamDTO>();
            }).CreateMapper();
            return mapper.Map<IQueryable<TeamDAL>, List<TeamDTO>>(_unitOfWork.TeamRepository.GetAll()).AsQueryable();
        }
        public void AddTeam(TeamDTO teamDTO)
        {
            if (teamDTO == null)
            {

            }
            TeamDAL team = new TeamDAL
            {
                TeamID = teamDTO.TeamID,
                Name = teamDTO.Name,
                Project = teamDTO.Project
            };
            _unitOfWork.TeamRepository.Create(team);
            _unitOfWork.Save();
        }
        public void DeleteTeam(int? id)
        {
            if (id == null)
            {

            }
            _unitOfWork.TeamRepository.Delete(id.Value);
            _unitOfWork.Save();
        }
        public void UpdateTeam(TeamDTO teamDTO)
        {
            if (teamDTO == null)
            {

            }
            TeamDAL team = new TeamDAL
            {
                TeamID = teamDTO.TeamID,
                Name = teamDTO.Name,
                Project = teamDTO.Project
            };
            _unitOfWork.TeamRepository.Update(team);
            _unitOfWork.Save();
        }
    }
}
