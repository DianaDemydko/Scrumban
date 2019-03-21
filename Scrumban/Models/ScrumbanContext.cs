using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CustomIdentityApp.Models
{
    public class ScrumbanContext: DbContext
    {
        public DbSet<Users> Users { get; set; }
        public  ScrumbanContext(DbContextOptions<ScrumbanContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        
    }
}
