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

namespace Scrumban.Tests
{
    public class TaskGridControllerTest
    {

        [Fact]
        public void GetTaskTest()
        {
            //Arrange
            var mock = new Mock<ITaskService>();

            mock.Setup(i => i.GetTasks()).Returns(new List<TaskDTO>().AsQueryable());
            TaskGridController controller = new TaskGridController(mock.Object);
            //Act
            var result = controller.GetTasks();

            //Assert
            mock.Verify(i => i.GetTasks(), Times.Once);

        }



        [Fact]
        public void AddTaskTest()
        {
            //Arrange
            var mock = new Mock<ITaskService>();
            TaskDTO taskDTO = new TaskDTO { Name = "TestTask", Description = "TestDescription" };
            mock.Setup(a => a.AddTask(taskDTO));
            TaskGridController controller = new TaskGridController(mock.Object);

            //Act
            var result = controller.Add(taskDTO);
            //Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void DeleteTaskTest()
        {
            //Arrange
            var mock = new Mock<ITaskService>();
            TaskDTO taskDTO = new TaskDTO { Name = "TestTask", Description = "TestDescription" };
            mock.Setup(a => a.AddTask(taskDTO));
            TaskGridController controller = new TaskGridController(mock.Object);
            var temp = controller.Add(taskDTO);
            //Act
            var result = controller.Delete(1);
            //Assert
            Assert.IsType<OkObjectResult>(result);
        }

        //[Fact]
        //public void UpdateTaskTest()
        //{
        //    //Arrange
        //    var mock = new Mock<ITaskService>();
        //    TaskDTO taskDTO = new TaskDTO { Name = "TestTask", Description = "TestDescription" };
        //    mock.Setup(a => a.AddTask(taskDTO));
        //    TaskDTO taskDTOresult = new TaskDTO { Name = "TestTask", Description = "TestDescription" };
        //    mock.Setup(a => a.UpdateTask(taskDTOresult));
        //    TaskGridController controller = new TaskGridController(mock.Object);
        //    var result = controller.Edit(taskDTOresult);
        //    Assert.IsType<OkObjectResult>(result);

        //}
    }
}
