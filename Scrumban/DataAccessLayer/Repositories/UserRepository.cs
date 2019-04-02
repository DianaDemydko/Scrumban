using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Interfaces;
//using Scrumban.DataAccessLayer.Models;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class UserRepository: BaseRepository<Users>, IUserRepository
    {
        public UserRepository(DbContextOptions<ScrumbanContext> options) : base(options)
        {

        }
        public UserRepository(ScrumbanContext repositoryContext) : base(repositoryContext)
        {

        }
     
  
}
}
