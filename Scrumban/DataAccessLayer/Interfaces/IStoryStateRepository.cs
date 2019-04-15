using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IStoryStateRepository : IBaseRepository<StoryStateDAL>
    {
    }
}