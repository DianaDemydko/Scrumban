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

        public TeamDTO ReadTeam(int id)
        {
 
                var team = _unitOfWork.TeamRepository.GetByID(id);
            
                return new TeamDTO
                {
                    TeamID = team.TeamID,
                    Name = team.Name,
                    Project = team.Project
                };
        }

        public IQueryable<TeamDTO> ReadTeams()
        {
            IQueryable<TeamDAL> teamsDAL = _unitOfWork.TeamRepository.GetAll();
            IQueryable<TeamDTO> teamsDTO = teamsDAL.Select(teamDAL => new TeamDTO()
            {
                TeamID = teamDAL.TeamID,
                Name = teamDAL.Name,
                Project = teamDAL.Project,
            });
            return teamsDTO.AsQueryable();

            //var mapper = new MapperConfiguration(cfg =>
            //{
            //    cfg.CreateMap<TeamDAL, TeamDTO>();
            //}).CreateMapper();
            //return mapper.Map<IQueryable<TeamDAL>, List<TeamDTO>>(_unitOfWork.TeamRepository.GetAll()).AsQueryable();
        }
        public void CreateTeam(TeamDTO teamDTO)
        {
            if (teamDTO != null)
            {
                TeamDAL team = new TeamDAL
                {
                    TeamID = teamDTO.TeamID,
                    Name = teamDTO.Name,
                    Project = teamDTO.Project
                };
                _unitOfWork.TeamRepository.Create(team);
                _unitOfWork.Save();
            }
           
        }
        public void DeleteTeam(int id)
        {
            
            _unitOfWork.TeamRepository.Delete(id);
                _unitOfWork.Save();
           
           
        }
        public void DeleteTeam(TeamDTO teamDTO)
        {

            TeamDAL teamToDelete = new TeamDAL() { TeamID = teamDTO.TeamID };
            _unitOfWork.TeamRepository.Delete(teamToDelete);
            _unitOfWork.Save();


        }
        public void UpdateTeam(TeamDTO teamDTO)
        {
            var team = _unitOfWork.TeamRepository.GetByID(teamDTO.TeamID);
            team = new TeamDAL
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
