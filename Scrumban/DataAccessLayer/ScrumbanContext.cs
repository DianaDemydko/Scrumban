
using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.DTO;
using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.Models;

namespace Scrumban.DataAccessLayer
{
    public class ScrumbanContext : DbContext
    {
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
         public DbSet<Defect> Defects { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<StoryState> StoryStates { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Priority> Priorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<State>().HasData(
                new State[]
                {
                    new State{Id = 1, Name = "Ready To Start"},
                    new State{Id = 2, Name = "In Progress"},
                    new State{Id = 3, Name = "Development Complete"},
                    new State{Id = 4, Name = "Test Complete"},
                    new State{Id = 5, Name = "Accepted"}
                }
            );
            modelBuilder.Entity<Priority>().HasData(
                new Priority[]
                {
                    new Priority{Id = 1, Name = "Low"},
                    new Priority{Id = 2, Name = "Medium"},
                    new Priority{Id = 3, Name = "Heigh"},
                    new Priority{Id = 4, Name = "Immediate"}
                }
            );
            modelBuilder.Entity<StoryState>().HasData(
                new StoryState[]
                {
                    new StoryState{Id=1,Name = "Non Started"},
                    new StoryState{Id=2,Name="In Progress"},
                    new StoryState{Id=3,Name="Rejected"},
                    new StoryState{Id=4,Name="In Complete"},
                    new StoryState{Id=5,Name="Done"},
                    new StoryState{Id=6,Name="Accepted"}
                }
            );
            modelBuilder.Entity<Story>().HasData(
                new Story[]
                {
                    new Story{Id=1,Name="Story1",Description = "Description1"},
                    new Story{Id=2,Name="Story2",Description = "Description2"},
                    new Story{Id=3,Name="Story3",Description = "Description3"}
                }
            );
            base.OnModelCreating(modelBuilder);
        }

    }
}
