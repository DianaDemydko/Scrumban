using Scrumban.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using System.Linq;
using Xunit;
using Moq;

namespace Scrumban.Test.Controllers.Tests
{
    public class DefectControllerTest
    {
        [Fact]
        public void GetDefectsTest()
        {
            //Arrange
            var mock = new Mock<IDefectService>();

            mock.Setup(i => i.GetDefects()).Returns(new List<DefectDTO>().AsQueryable());
            DefectController controller = new DefectController(mock.Object);
            //Act
            var result = controller.GetDefects();

            //Assert
            mock.Verify(i => i.GetDefects(), Times.Once);
        }
        [Fact]
        public void AddDefectTest()
        {
            //Arrange
            var mock = new Mock<IDefectService>();
            DefectDTO defectDTO = new DefectDTO();
            mock.Setup(a => a.AddDefect(defectDTO));
            DefectController controller = new DefectController(mock.Object);

            //Act
            var result = controller.Add(defectDTO);
            //Assert
            Assert.IsType<OkResult>(result);
        }
        [Fact]
        public void DeleteDefectTest()
        {
            //Arrange
            var mock = new Mock<IDefectService>();
            DefectDTO defectDTO = new DefectDTO();
            mock.Setup(a => a.AddDefect(defectDTO));
            DefectController controller = new DefectController(mock.Object);

            controller.Add(defectDTO);
            //Act
            var result = controller.Delete(defectDTO.DefectId);
            //Assert
            Assert.IsType<OkObjectResult>(result);
        }
        [Fact]
        public void UpdateDefectTest()
        {
            //Arrange
            var mock = new Mock<IDefectService>();
            DefectDTO defectDTO = new DefectDTO { Name = "Test", Description = "Test" };
            mock.Setup(a => a.AddDefect(defectDTO));
            string exp = "111";
            defectDTO.Name = exp;
            defectDTO.Description = exp;
            mock.Setup(a => a.UpdateDefect(defectDTO));
            DefectController controller = new DefectController(mock.Object);
            var result = controller.Edit(defectDTO);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(exp,defectDTO.Name);
            Assert.Equal(exp,defectDTO.Description);

        }
    }
}
