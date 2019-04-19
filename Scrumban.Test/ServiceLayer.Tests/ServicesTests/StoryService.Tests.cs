using System;
using Moq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using Scrumban.ServiceLayer.DTO;
using Scrumban.ServiceLayer.Services;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Scrumban.Test.ServiceLayer.Tests.ServicesTests
{
    public class StoryServiceTests
    {
        [Fact]
        public void GetStoriesTest()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(i => i.StoryRepository.GetAll()).Returns(new List<StoryDAL>().AsQueryable());
            StoryService service = new StoryService(mock.Object);
            var result = service.GetStories();
            Assert.IsAssignableFrom<IQueryable<StoryDTO>>(result);
        }

        [Fact]
        public void CreateStoryTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newStory = new StoryDTO()
            {

                Name = "StoryName",
                Description = "Description"
            };
            StoryService service = new StoryService(mock.Object);
            service.CreateStory(newStory);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void GetStoryTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newStory = new StoryDTO()
            {
                Name = "StoryName",
                Description = "Description",
                StoryState = "abcd",
            };
            StoryService service = new StoryService(mock.Object);
            service.CreateStory(newStory);
            var result = service.GetStory(newStory.Story_id);
            Assert.Equal(newStory.Story_id, result.Story_id);
            Assert.NotStrictEqual(result.Name,newStory.Name);
            Assert.NotStrictEqual(result.Description,newStory.Description);
            Assert.NotStrictEqual(result.StoryState,newStory.StoryState);
        }

        [Fact]
        public void DeleteStoryTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newStory = new StoryDTO()
            {
                Name = "StoryName",
                Description = "Description"
            };
            StoryService service = new StoryService(mock.Object);
            service.CreateStory(newStory);
            service.DeleteStory(newStory);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void DeleteStoryByIdTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newStory = new StoryDTO()
            {
                Name = "StoryName",
                Description = "Description"
            };
            StoryService service = new StoryService(mock.Object);
            service.CreateStory(newStory);
            service.DeleteStory(newStory.Story_id);
            mock.Verify(i => i.Save());
        }

        [Fact]
        public void UpdateStoryTest()
        {
            var mock = new Mock<IUnitOfWork>()
            {
                DefaultValue = DefaultValue.Mock
            };
            var newStory = new StoryDTO()
            {

                Name = "StoryName",
                Description = "Description"
            };
            StoryService service = new StoryService(mock.Object);
            service.CreateStory(newStory);
            newStory.Name = "Resultname";
            newStory.Description = "111";
            service.UpdateStory(newStory);
            var result = service.GetStory(newStory.Story_id);
            Assert.NotStrictEqual("Resultname",result.Name);
            Assert.NotStrictEqual("111",result.Description);
        }
    }
}
