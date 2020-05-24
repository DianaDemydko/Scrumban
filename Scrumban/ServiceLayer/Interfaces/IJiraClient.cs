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

       [Get("/rest/api/latest/search?jql=issueType=story&maxResults=1000")]
        Task<GetIssuesResponse> GetIssues();

        [Get("/rest/api/latest/issue/{issueId}")]
        Task<GetIssue> GetIssue([Path]int issueId);

    }
}
