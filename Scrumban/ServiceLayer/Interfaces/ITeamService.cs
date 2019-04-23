using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.ServiceLayer.DTO;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface ITeamService
    {
        TeamDTO ReadTeam(int id);
        IQueryable<TeamDTO> ReadTeams();
        void CreateTeam(TeamDTO teamDTO);
        void DeleteTeam(int id);
        void UpdateTeam(TeamDTO teamDTO);
        void DeleteTeam(TeamDTO teamDTO);
    }
}
