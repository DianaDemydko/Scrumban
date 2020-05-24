using Scrumban.DataAccessLayer.Models;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IJiraService
    { 
        Task<GetIssuesResponse> GetIssueResponse(string path, string username, string password, string project);
    }
}
