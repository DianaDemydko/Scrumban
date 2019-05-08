using RestEase;
using Scrumban.DataAccessLayer.Models;
using Scrumban.DataAccessLayer.Models.JiraEntity;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Scrumban.ServiceLayer.Interfaces
{
    //[Header("Accept", "application/json")]
    public interface IJiraClient
    {
        [Header("Authorization")]
        AuthenticationHeaderValue Authorization { get; set; }

       //[Get("/rest/api/2/issue/LVNETI-27")]
       [Get("/rest/agile/1.0/board/1/issue")]
        Task<GetIssuesResponse> GetIssues();

        [Get("/rest/agile/1.0/issue/{issueId}")]
        Task<GetIssue> GetIssue([Path]int issueId);

    }
}
