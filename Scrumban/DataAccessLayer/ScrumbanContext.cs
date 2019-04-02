
using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.DTO;
using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.Models;
using Scrumban.Models.Entities;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer
{
    public class ScrumbanContext : DbContext
    {
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Feature> Features { get; set;}
        public DbSet<Defect> Defects { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<StoryState> StoryStates { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskState> TaskStates { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<SprintDAL> Sprints { get; set; }
        public DbSet<SprintStatusDAL> SprintStatuses { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskState>().HasData(
                new TaskState[]
                {
                    new TaskState{Id = 1, Name = "To Do"},
                    new TaskState{Id = 2, Name = "In Progress"},
                    new TaskState{Id = 3, Name = "Completed"}
                }
            );
            modelBuilder.Entity<Scrumban.Models.Entities.State>().HasData(
                new Scrumban.Models.Entities.State[]
                {
                    new Scrumban.Models.Entities.State{Id = 1, Name = "Ready To Start"},
                    new Scrumban.Models.Entities.State{Id = 2, Name = "In Progress"},
                    new Scrumban.Models.Entities.State{Id = 3, Name = "Development Complete"},
                    new Scrumban.Models.Entities.State{Id = 4, Name = "Test Complete"},
                    new Scrumban.Models.Entities.State{Id = 5, Name = "Accepted"}
                }
            );

            modelBuilder.Entity<Scrumban.DataAccessLayer.Models.SprintStatusDAL>().HasData(
                new Scrumban.DataAccessLayer.Models.SprintStatusDAL[]
                {
                    new SprintStatusDAL(){SprintStatus_id=1, StatusName="Not Started" },
                    new SprintStatusDAL(){SprintStatus_id=2, StatusName="Started" },
                    new SprintStatusDAL(){SprintStatus_id=3, StatusName="Completed" },
                    new SprintStatusDAL(){SprintStatus_id=4, StatusName="Canceled" }
                }
                );

            modelBuilder.Entity<Scrumban.DataAccessLayer.Models.SprintDAL>().HasData(
                new Scrumban.DataAccessLayer.Models.SprintDAL[]
                {
                    new SprintDAL(){ Sprint_id=1, SprintStatus_id=1, Description="HUGE desc ======== ============== ========= ===============",
                        EndDate =new DateTime(2019,4,20), StartDate=new DateTime(2019,1,12), Name="AAaSprint"},
                    new SprintDAL(){ Sprint_id=2, SprintStatus_id=1, Description="empty", EndDate=new DateTime(2019,9,2), StartDate=new DateTime(2019,8,9), Name="bbbb Sprint"},
                    new SprintDAL(){ Sprint_id=3, SprintStatus_id=1, Description="-", EndDate=new DateTime(2019,10,27), StartDate=new DateTime(2019,8,2), Name="anonimous"},
                    new SprintDAL(){ Sprint_id=4, SprintStatus_id=1, Description="desc", EndDate=new DateTime(2019,12,3), StartDate=new DateTime(2019,8,17), Name="nameless"},
                    new SprintDAL(){ Sprint_id=5, SprintStatus_id=1, Description="666 Don't delete this 666", EndDate=new DateTime(2018,4,7), StartDate=new DateTime(2018,3,13), Name="Evil Sprint 666"},
                    new SprintDAL(){ Sprint_id=6, SprintStatus_id=1, Description="some desc", EndDate=new DateTime(2018,5,22), StartDate=new DateTime(2018,1,20), Name="XXXX"}
                }
                );

            modelBuilder.Entity<Scrumban.Models.Entities.Priority>().HasData(
                new Scrumban.Models.Entities.Priority[]
                {
                    new Scrumban.Models.Entities.Priority{Id = 1, Name = "Low"},
                    new Scrumban.Models.Entities.Priority{Id = 2, Name = "Medium"},
                    new Scrumban.Models.Entities.Priority{Id = 3, Name = "Heigh"},
                    new Scrumban.Models.Entities.Priority{Id = 4, Name = "Immediate"}
                }
            );
            modelBuilder.Entity<Scrumban.Models.Entities.Task>().HasData(
                new Scrumban.Models.Entities.Task[]
                {
                    new Scrumban.Models.Entities.Task { Id = 1, Name = "Task1" },
                    new Scrumban.Models.Entities.Task { Id = 2, Name = "Task2" },
                    new Scrumban.Models.Entities.Task { Id = 3, Name = "Task3" }
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
