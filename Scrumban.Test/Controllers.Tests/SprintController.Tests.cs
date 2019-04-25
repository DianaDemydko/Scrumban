using Moq;
using Scrumban.Controllers;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using System.Linq;
using Xunit;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.Test.Controllers.Tests
{
    public class SprintControllerTest
    {
        [Fact]
        public void IndexTest ()
        {
            //Arrange
            var mock = new Mock<ISprintService>();

            mock.Setup(i => i.GetAllSprints()).Returns(new List<SprintDTO>().AsQueryable());
            SprintController controller = new SprintController(mock.Object);
            //Act
            var result = controller.Index();

            //Assert
            mock.Verify(i => i.GetAllSprints(), Times.Once);
        }

        [Fact]
        public void AddSprintTest ()
        {
            //Arrange
            var mock = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO { Name = "Sprint", Description = "Description" };
            mock.Setup(a => a.Create(sprintDTO));
            SprintController controller = new SprintController(mock.Object);

            //Act
            var result = controller.Create(sprintDTO);
            //Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void  UpdateSprintTest()
        {
            var mock = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO { Name = "Test", Description = "Test" };
            mock.Setup(a => a.Create(sprintDTO));
            string exp = "111";
            sprintDTO.Name = exp;
            sprintDTO.Description = exp;
            mock.Setup(a => a.Update(sprintDTO));
            SprintController controller = new SprintController(mock.Object);
            var result = controller.Edit(sprintDTO);
            Assert.IsType<OkResult>(result);
            Assert.Equal(exp, sprintDTO.Name);
            Assert.Equal(exp, sprintDTO.Description);
        }

        [Fact]
        public void DeletesprintTest()
        {
            var mock = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO { Name = "Test", Description = "Test" };
            mock.Setup(a => a.Create(sprintDTO));
            SprintController controller = new SprintController(mock.Object);
            mock.Setup(a => a.Delete(sprintDTO));
            //Act
            var result = controller.Delete(sprintDTO.Sprint_id);
            //Assert
            Assert.IsType<OkResult>(result);

        }

    }
}
