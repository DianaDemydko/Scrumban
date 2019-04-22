using Moq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;
using DefectService = Scrumban.ServiceLayer.Services.DefectService;

namespace Scrumban.Test.ServiceLayer.Tests.ServicesTests
{
    public class DefectServiceTests
    {
        [Fact]
        public void AddDefectTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newDefect = new DefectDTO()
            {
                Name = "DefectName",
                Description = "DefectDescription"
            };
            DefectService service = new DefectService(mock.Object);
            service.AddDefect(newDefect);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void GetDefectsTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i => i.Defects.GetAll()).Returns(new List<DefectDAL>().AsQueryable());
            DefectService service = new DefectService(mock.Object);
            var result = service.GetDefects();
            Assert.IsAssignableFrom<IQueryable<DefectDTO>>(result);
        }

        [Fact]
        public void GetDefectTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newDefect = new DefectDTO()
            {
                Name = "DefectName",
                Description = "DefectDescription"
            };
            DefectService service = new DefectService(mock.Object);
            service.AddDefect(newDefect);
            var result = service.GetDefect(newDefect.DefectId);
            Assert.Equal(newDefect.DefectId, result.DefectId);
            Assert.NotStrictEqual("DefectName", result.Name);
            Assert.NotStrictEqual("DefectDescription",result.Description);
        }

        [Fact]
        public void UpdateDefectTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newDefect = new DefectDTO()
            {
                Name = "DefectName",
                Description = "Description"
            };
            DefectService service = new DefectService(mock.Object);
            service.AddDefect(newDefect);
            newDefect.Name = "resultName";
            newDefect.Description = "resultDescription";
            service.UpdateDefect(newDefect);
            var resultDefect = service.GetDefect(newDefect.DefectId);
            Assert.NotStrictEqual("resultName", resultDefect.Name);
            Assert.NotStrictEqual("resultDescription", resultDefect.Description);
        }

        [Fact]
        public void DeleteDefectTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newDefect = new DefectDTO()
            {
                Name = "DefectName",
                Description = "DefectDescription"
            };
            DefectService service = new DefectService(mock.Object);
            service.AddDefect(newDefect);
            service.DeleteDefect(newDefect.DefectId);
            mock.Verify(i => i.Save());
        }
    }
}
