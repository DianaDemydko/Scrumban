using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.ServiceLayer.DTO;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface ITeamService
    {
        TeamDTO GetTeam(int? id);
        IQueryable<TeamDTO> GetTeams();
        void AddTeam(TeamDTO teamDTO);
        void DeleteTeam(int? id);
        void UpdateTeam(TeamDTO teamDTO);
    }
}
