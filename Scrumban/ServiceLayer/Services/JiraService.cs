using RestEase;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Scrumban.ServiceLayer.Interfaces;

namespace Scrumban.ServiceLayer.Services
{
    public class JiraService : IJiraService
    {
        IUnitOfWork _unitOfWork { get; set; }
        public JiraService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
           
        }
        public async Task<GetIssuesResponse> GetIssueResponse(string path, string username, string password)
        {
            var api = RestClient.For<IJiraClient>(path);
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            api.Authorization = new AuthenticationHeaderValue("Basic", credentials);

                var issues = await api.GetIssues();
        

            Mapper.Initialize(cfg => cfg.CreateMap<GetIssuesResponse, DefectDAL  >()
                .ForMember("Name", opt=>opt.MapFrom(c=>c.Key))
                .ForMember("Description", opt=>opt.MapFrom(c=>c.Fields.Summary))
                .ForMember("State",opt=>opt.MapFrom(c=>c.Fields.Status.Name)));

            DefectDAL defect= Mapper.Map<GetIssuesResponse, DefectDAL>(issues);

            _unitOfWork.Defects.Create(defect);
            _unitOfWork.Save();

            return issues;
        }
    }
}
