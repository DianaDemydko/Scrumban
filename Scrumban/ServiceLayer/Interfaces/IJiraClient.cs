using RestEase;
using Scrumban.DataAccessLayer.Models;
using Scrumban.DataAccessLayer.Models.JiraEntity;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.Interfaces
{
    public interface IJiraClient
    {
        [Header("Authorization")]
        AuthenticationHeaderValue Authorization { get; set; }

       [Get("/rest/agile/1.0/board/2/issue")]
        Task<GetIssuesResponse> GetIssues();

        [Get("/rest/agile/1.0/issue/{issueId}")]
        Task<GetIssue> GetIssue([Path]int issueId);

    }
}
