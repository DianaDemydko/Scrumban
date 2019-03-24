using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scrumban.Models;

namespace Scrumban.DataAccessLayer
{
    public class SprintRepository : BaseRepository<Sprint>, ISprintRepository
    {
        public SprintRepository(ScrumbanContext repositoryContext) : base(repositoryContext)
        {

        }
    }
}
