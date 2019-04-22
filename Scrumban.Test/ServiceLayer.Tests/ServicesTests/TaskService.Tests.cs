using Moq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.ServiceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Scrumban.DataAccessLayer.Models;
using Xunit;
using Scrumban.BusinessLogicLayer;

namespace Scrumban.Test.ServiceLayer.Tests.ServicesTests
{
    public class TaskServiceTests
    {
        [Fact]
        public void GetTasksTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i=>i.Tasks.GetAll()).Returns(new List<TaskDAL>().AsQueryable());
            TaskService service=new TaskService(mock.Object);
            var result = service.GetTasks();
            Assert.IsAssignableFrom<IQueryable<TaskDTO>>(result);
        }

        [Fact]
        public void GetPrioritiesTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i => i.Tasks.GetAll()).Returns(new List<TaskDAL>().AsQueryable());
            TaskService service = new TaskService(mock.Object);
            var result = service.GetPriorities();
            Assert.IsAssignableFrom<IEnumerable<PriorityDTO>>(result);
        }
        [Fact]
        public void GetStatesTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i => i.Tasks.GetAll()).Returns(new List<TaskDAL>().AsQueryable());
            TaskService service = new TaskService(mock.Object);
            var result = service.GetStates();
            Assert.IsAssignableFrom<IEnumerable<TaskStateDTO>>(result);
        }
        [Fact]
        public void AddTaskTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newTask= new TaskDTO()
            {
                Name = "TaskName",
                Description = "Description"
            };
            TaskService service = new TaskService(mock.Object);
            service.AddTask(newTask);
            mock.Verify(i=>i.Save());

        }
        [Fact]
        public void DeleteTaskTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newTask = new TaskDTO()
            {
                Name = "TaskName",
                Description = "Description"
            };
            TaskService service = new TaskService(mock.Object);
            service.AddTask(newTask);
            service.DeleteTask(newTask.Id);
            mock.Verify(i => i.Save());

        }
        [Fact]
        public void GetByIdTaskTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newTask = new TaskDTO()
            {
                Name = "TaskName",
                Description = "Description"
            };
            TaskService service = new TaskService(mock.Object);
            service.AddTask(newTask);
            var result = service.GetTask(newTask.Id);
            Assert.Equal(newTask.Id, result.Id);

        }
        [Fact]
        public void UpdateTaskTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newTask = new TaskDTO()
            {
                Id = 1,
                Name = "TaskName",
                Description = "Description"
            };
            TaskService service = new TaskService(mock.Object);
            service.AddTask(newTask);
            newTask.Name = "resultTaskName";
            newTask.Description = "resultDescription";
            service.UpdateTask(newTask);
            var resultTask = service.GetTask(newTask.Id);
            Assert.NotStrictEqual("resultTaskName", resultTask.Name);
            Assert.NotStrictEqual("resultDescription", resultTask.Description);


        }
    }
}
