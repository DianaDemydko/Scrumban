using System;
using Microsoft.EntityFrameworkCore;
using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer
{
    public class ScrumbanContext : DbContext
    {
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<FeatureDAL> Features { get; set;}
        public DbSet<DefectDAL> Defects { get; set; }
        public DbSet<UsersDAL> Users { get; set; }
        public DbSet<StoryDAL> Stories { get; set; }
        public DbSet<StoryStateDAL> StoryStates { get; set; }
        public DbSet<StateDAL> States { get; set; }
        public DbSet<TaskDAL> Tasks { get; set; }
        public DbSet<TaskStateDAL> TaskStates { get; set; }
        public DbSet<PriorityDAL> Priorities { get; set; }
        public DbSet<SprintDAL> Sprints { get; set; }
        public DbSet<SprintStatusDAL> SprintStatuses { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskStateDAL>().HasData(
                new TaskStateDAL[]
                {
                    new TaskStateDAL{Id = 1, Name = "To Do"},
                    new TaskStateDAL{Id = 2, Name = "In Progress"},
                    new TaskStateDAL{Id = 3, Name = "Completed"}
                }
            );
            modelBuilder.Entity<StateDAL>().HasData(
                new StateDAL[]
                {
                    new StateDAL{Id = 1, Name = "Ready To Start"},
                    new StateDAL{Id = 2, Name = "In Progress"},
                    new StateDAL{Id = 3, Name = "Development Complete"},
                    new StateDAL{Id = 4, Name = "Test Complete"},
                    new StateDAL{Id = 5, Name = "Accepted"}
                }
            );

            modelBuilder.Entity<SprintStatusDAL>().HasData(
                new SprintStatusDAL[]
                {
                    new SprintStatusDAL(){SprintStatus_id=1, StatusName="Not Started" },
                    new SprintStatusDAL(){SprintStatus_id=2, StatusName="Started" },
                    new SprintStatusDAL(){SprintStatus_id=3, StatusName="Completed" },
                    new SprintStatusDAL(){SprintStatus_id=4, StatusName="Canceled" }
                }
                );

            modelBuilder.Entity<SprintDAL>().HasData(
                new SprintDAL[]
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

            modelBuilder.Entity<PriorityDAL>().HasData(
                new PriorityDAL[]
                {
                    new PriorityDAL{Id = 1, Name = "Low"},
                    new PriorityDAL{Id = 2, Name = "Medium"},
                    new PriorityDAL{Id = 3, Name = "Heigh"},
                    new PriorityDAL{Id = 4, Name = "Immediate"}
                }
            );
            modelBuilder.Entity<TaskDAL>().HasData(
                new TaskDAL[]
                {
                    new TaskDAL { Id = 1, Name = "Task1" },
                    new TaskDAL { Id = 2, Name = "Task2" },
                    new TaskDAL { Id = 3, Name = "Task3" }
                }
            );
            
            modelBuilder.Entity<StoryStateDAL>().HasData(
                new StoryStateDAL[]
                {
                    new StoryStateDAL{StoryState_id=1,Name = "Non Started"},
                    new StoryStateDAL{StoryState_id=2,Name="In Progress"},
                    new StoryStateDAL{StoryState_id=3,Name="Rejected"},
                    new StoryStateDAL{StoryState_id=4,Name="In Complete"},
                    new StoryStateDAL{StoryState_id=5,Name="Done"},
                    new StoryStateDAL{StoryState_id=6,Name="Accepted"}
                }
            );
            modelBuilder.Entity<StoryDAL>().HasData(
                new StoryDAL[]
                {
                    new StoryDAL{Story_id=1,Name="Story1",Description = "Description1"},
                    new StoryDAL{Story_id=2,Name="Story2",Description = "Description2"},
                    new StoryDAL{Story_id=3,Name="Story3",Description = "Description3"}
                }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
