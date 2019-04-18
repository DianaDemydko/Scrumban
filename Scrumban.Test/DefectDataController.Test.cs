using Scrumban.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using System.Linq;
using Xunit;
using Moq;

namespace Scrumban.Test
{
    public class DefectDataControllerTest
    {
        [Fact]
        public void GetDefectsTest()
        {
            //Arrange
            var mock = new Mock<IDefectService>();

            mock.Setup(i => i.GetDefects()).Returns(new List<DefectDTO>().AsQueryable());
            DefectDataController controller = new DefectDataController(mock.Object);
            //Act
            var result = controller.GetDefects();

            //Assert
            mock.Verify(i => i.GetDefects(), Times.Once);
        }
        [Fact]
        public void AddDefectTest()
        {
            //Arrangeд
            var mock = new Mock<IDefectService>();
            DefectDTO defectDTO = new DefectDTO() ;
            mock.Setup(a => a.AddDefect(defectDTO));
            DefectDataController controller = new DefectDataController(mock.Object);

            //Act
            var result = controller.Add(defectDTO);
            //Assert
            Assert.IsType<OkResult>(result);
        }
        //[Fact]
        //public void DeleteDefectTest()
        //{
        //    //Arrange
        //    var mock = new Mock<IDefectService>();
        //    DefectDTO defectDTO = new DefectDTO();
        //    mock.Setup(a => a.AddDefect(defectDTO));
        //    DefectDataController controller = new DefectDataController(mock.Object);

        //    var temp = controller.Add(defectDTO);
        //    //Act
        //    var result = controller.Delete(defectDTO.DefectId);
        //    //Assert
        //    Assert.IsType<BadRequestResult>(result);
        //}
    }
}
