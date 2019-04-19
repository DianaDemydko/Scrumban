using Moq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Scrumban.DataAccessLayer.Models;
using Xunit;
using System.Linq;

namespace Scrumban.Test.ServiceLayer.Tests.ServicesTests
{
    public class SprintServiceTests
    {
        [Fact]
        public void CreateTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newSprint = new SprintDTO();
            SprintService service = new SprintService(mock.Object);
            service.Create(newSprint);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void GetSprintTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newSprint = new SprintDTO()
            {
                Name = "Name",
                Description = "Description",
            };
            SprintService service = new SprintService(mock.Object);
            service.Create(newSprint);
            var result = service.GetByID(newSprint.Sprint_id);
            Assert.Equal(newSprint.Sprint_id, result.Sprint_id);
            Assert.NotStrictEqual(result.Name, newSprint.Name);
            Assert.NotStrictEqual(result.Description, newSprint.Description);
        }

        [Fact]
        public void GetSprintsTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i => i.SprintRepository.GetAll()).Returns(new List<SprintDAL>().AsQueryable());
            SprintService service = new SprintService(mock.Object);
            var result = service.GetAllSprints();
            Assert.IsAssignableFrom<IQueryable<SprintDTO>>(result);
        }

        [Fact]
        public void DeleteSprintTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newSprint = new SprintDTO();
            SprintService service = new SprintService(mock.Object);
            service.Create(newSprint);
            service.Delete(newSprint);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void UpdateTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newSprint = new SprintDTO()
            {

                Name = "Name",
                Description = "Description"
            };
            SprintService service = new SprintService(mock.Object);
            service.Create(newSprint);
            newSprint.Name = "NameName";
            newSprint.Description = "description";
            service.Update(newSprint);
            var result = service.GetByID(newSprint.Sprint_id);
            Assert.Equal(result.Sprint_id,newSprint.Sprint_id);
            //Assert.NotStrictEqual("NameName", result.Name);
            //Assert.NotStrictEqual("description", result.Description);
        }
    }
}
