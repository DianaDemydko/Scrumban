using RestEase;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.DataAccessLayer.Models.JiraEntity;

namespace Scrumban.ServiceLayer.Services
{
    public class JiraService : IJiraService
    {
        IUnitOfWork _unitOfWork { get; set; }
        private IMapper _mapper;
        public JiraService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<GetIssue, StoryDAL>()
                .ForMember(bs => bs.Name, opt => opt.MapFrom(c => c.Fields.Summary))
                .ForMember(bs => bs.Description, opt => opt.MapFrom(c => c.Fields.Description))
                .ForMember(bs => bs.StartDate, opt => opt.MapFrom(c => c.Fields.Created));
            }).CreateMapper();
        }
        public async Task<GetIssuesResponse> GetIssueResponse(string path, string username, string password, string project)
        {
            var api = RestClient.For<IJiraClient>(path);
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            api.Authorization = new AuthenticationHeaderValue("Basic", credentials);

                var issues = await api.GetIssues();

            for (var i = 0; i < issues.Issues.Length; i++) { 
                var issue = await api.GetIssue(issues.Issues[i].Id);
                var storyDAL = _mapper.Map<GetIssue, StoryDAL>(issue);
                if (issue.Fields.Status.Name == "To Do")
                {
                    storyDAL.StoryState_id = 1;
                }
                else
                {
                    storyDAL.StoryState_id = _unitOfWork.StoryStateRepository.GetByCondition(story => story.Name == issue.Fields.Status.Name).StoryState_id;
                }

                _unitOfWork.StoryRepository.Create(storyDAL);
            }
            _unitOfWork.Save();

            return issues;
        }
    }
}
