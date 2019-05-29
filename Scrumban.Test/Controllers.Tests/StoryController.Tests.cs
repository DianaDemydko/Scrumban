using System;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Interfaces;
using Xunit;
using Scrumban.Controllers;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.Test.Controllers.Tests
{
    public class StoryControllerTest
    {
        [Fact]
        public void CreateTest()
        {
            //Arrange
            var mockStory = new Mock<IStoryService>();
            var mockSprint = new Mock<ISprintService>();
            StoryDTO storyDTO = new StoryDTO();
            SprintDTO sprintDTO = new SprintDTO();
            mockStory.Setup(a => a.CreateStory(storyDTO));
            mockSprint.Setup(a => a.Create(sprintDTO));
            StoryController controller = new StoryController(mockStory.Object,mockSprint.Object);

            //Act
            var result = controller.CreateStory(storyDTO);
            //Assert
            Assert.IsType<CreatedResult>(result);
        }

        [Fact]
        public void GetStoryTest()
        {
            //Arrange
            var mock = new Mock<IStoryService>();
            var mockSprint = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO();
            StoryDTO storyDTO= new StoryDTO
            {
                Story_id=1,
                Name = "name",
                Description = "description"
            };
            mock.Setup(i => i.GetStory(storyDTO.Story_id));
            mockSprint.Setup(a => a.Create(sprintDTO));
            StoryController controller = new StoryController(mock.Object,mockSprint.Object);
            //Act
            var result = controller.GetStory(storyDTO.Story_id);

            //Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void GetStories()
        {
            var mock = new Mock<IStoryService>();
            var mockSprint = new Mock<ISprintService>();

            SprintDTO sprintDTO = new SprintDTO();
            mockSprint.Setup(a => a.Create(sprintDTO));

            mock.Setup(i => i.GetStories()).Returns(new List<StoryDTO>().AsQueryable());
            StoryController controller = new StoryController(mock.Object,mockSprint.Object);
            //Act
            var result = controller.GetStories();

            //Assert
            mock.Verify(i => i.GetStories(), Times.Once);
        }

        [Fact]
        public void UpdateStoryTest()
        {
            var mock = new Mock<IStoryService>();
            var mockSprint = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO();

            mockSprint.Setup(a => a.Create(sprintDTO));
            StoryDTO storyDTO = new StoryDTO { Name = "Test", Description = "Test" };
            mock.Setup(a => a.CreateStory(storyDTO));
            string exp = "111";
            storyDTO.Name = exp;
            storyDTO.Description = exp;
            mock.Setup(a => a.UpdateStory(storyDTO));
            StoryController controller = new StoryController(mock.Object,mockSprint.Object);
            var result = controller.UpdateStory(storyDTO);
            Assert.IsType<OkResult>(result);
            Assert.Equal(exp, storyDTO.Name);
            Assert.Equal(exp, storyDTO.Description);

        }

        [Fact]
        public void DeleteStoryTest()
        {
            //Arrange
            var mock = new Mock<IStoryService>();

            var mockSprint = new Mock<ISprintService>();
            SprintDTO sprintDTO = new SprintDTO();

            mockSprint.Setup(a => a.Create(sprintDTO));
            StoryDTO storyDTO = new StoryDTO { Name = "Test", Description = "Description" };
            mock.Setup(a => a.CreateStory(storyDTO));
            StoryController controller = new StoryController(mock.Object,mockSprint.Object);
            var temp = controller.CreateStory(storyDTO);
            //Act
            var result = controller.DeleteStory(storyDTO.Story_id);
            //Assert
            Assert.IsType<OkResult>(result);
        }
    }
}
