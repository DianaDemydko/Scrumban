using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.Models
{
    public class ScrumbanContext: DbContext
    {
        public DbSet<Feature> Features { get; set; }
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Story>().HasData(
               new Story[]
               {
                    new Story {ID = 1, Name = "Story1"},
                    new Story {ID = 2, Name = "Story2"},
                    new Story {ID = 3, Name = "Story3"},
                    new Story {ID = 4, Name = "Story4"}
               }
                );
            modelBuilder.Entity<Owner>().HasData(
             new Owner[]
             {
                    new Owner {ID = 1, Name = "Owner1"},
                    new Owner {ID = 2, Name = "Owner2"}
             }
              );
            modelBuilder.Entity<State>().HasData(
                new State[]
                {
                    new State {ID = 1, Name = "Ready to start"},
                    new State {ID = 2, Name = "In progress"}
                }
                 );
            modelBuilder.Entity<Feature>().HasData(
                new Feature[]
                {
                new Feature {ID = 1,  Name = "Feature1", Priority = 1, StateID = 1,  OwnerID= 1, Description = "Description for Feature1"},
                new Feature {ID = 2,  Name = "Feature2", Priority = 2, StateID = 2,  OwnerID= 2, Description = "Description for Feature2"}
                });

            base.OnModelCreating(modelBuilder);
        }

    }
}
