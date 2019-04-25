using System;
using System.Security.Cryptography;
using System.Text;
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
        public DbSet<RoleDAL> Roles { get; set; }
        public DbSet<PictureDAL> Pictures { get; set; }
        public DbSet<StoryDAL> Stories { get; set; }
        public DbSet<StoryStateDAL> StoryStates { get; set; }
        public DbSet<StateDAL> States { get; set; }
        public DbSet<TaskDAL> Tasks { get; set; }
        public DbSet<TaskStateDAL> TaskStates { get; set; }
        public DbSet<PriorityDAL> Priorities { get; set; }
        public DbSet<SprintDAL> Sprints { get; set; }
        public DbSet<SprintStatusDAL> SprintStatuses { get; set; }
        public DbSet<TokenRefreshDAL> TokenRefresh { get; set; }
        public DbSet<TaskChangeHistoryDAL> TaskChangeHistories { get; set; }
        public DbSet<TeamDAL> Teams { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DefectDAL>().HasData(
                new DefectDAL[]
                {
                   new DefectDAL(){DefectId=1, Name="Defect_1",Description="Descriprion_1",State="To Do",Priority="Medium",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=2, Name="Some Defect",Description="Descriprion_2",State="Done",Priority="High",Severity="Critical",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=3, Name="Menu",Description="Descriprion_3",State="Done",Priority="High",Severity="Medium",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=4, Name="Autorization",Description="Descriprion_3",State="Done",Priority="High",Severity="Critical",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=5, Name="Pagination",Description="Descriprion_5",State="Done",Priority="High",Severity="Critical",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=6, Name="KanbanBoard",Description="Descriprion_7",State="Done",Priority="High",Severity="Critical",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=7, Name="BusinessLogic",Description="Descriprion_9",State="In progress",Priority="High",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=8, Name="ConnectToDatabase",Description="Descriprion_1",State="Done",Priority="High",Severity="Critical",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=9, Name="Style",Description="Descriprion_2",State="To Do",Priority="High",Severity="Critical",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=10, Name="Defect_5",Description="Descriprion_3",State="Done",Priority="Medium",Severity="Medium",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=11, Name="Defect_3",Description="Descriprion_5",State="In progress",Priority="Medium",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=12, Name="Defect_9",Description="Descriprion_2",State="Done",Priority="Low",Severity="Medium",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=13, Name="Defect_10",Description="Descriprion_1",State="To Do",Priority="Medium",Severity="Low",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=14, Name="Defect_12",Description="Descriprion_8",State="Done",Priority="High",Severity="Low",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=15, Name="Defect_18",Description="Descriprion_2",State="In progress",Priority="Low",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=16, Name="Defect_20",Description="Descriprion_1",State="Done",Priority="Medium",Severity="Low",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=17, Name="Defect_11",Description="Descriprion_8",State="In progress",Priority="Low",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=18, Name="Defect_14",Description="Descriprion_2",State="Done",Priority="Medium",Severity="Low",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=19, Name="Defect_17",Description="Descriprion_5",State="To Do",Priority="Low",Severity="Medium",StoryId=1,Status="Open" },
                   new DefectDAL(){DefectId=20, Name="Defect_30",Description="Descriprion_2",State="Done",Priority="Low",Severity="Low",StoryId=1,Status="Close" },
                   new DefectDAL(){DefectId=21, Name="Defect_12",Description="Descriprion_1",State="In progress",Priority="Medium",Severity="Medium",StoryId=1,Status="Open" }
                }
                );
            // User Identity
            modelBuilder.Entity<RoleDAL>().HasData(
                new RoleDAL[]
                {
                    new RoleDAL{ Id = 1, Name = "Team Member" },
                    new RoleDAL{ Id = 2, Name = "Scrum Master" },
                    new RoleDAL{ Id = 3, Name = "Product Owner" },
                    new RoleDAL{ Id = 4, Name = "Tester" },
                    new RoleDAL{ Id = 5, Name = "Admin"}
                }
            );

            UsersDAL user = new UsersDAL
            {
                Id = 1,
                FirstName = "Name",
                Surname = "Surname",
                Email = "admin@gmail.com",
                Password = generatePasswordHash("Admin1"),
                RoleId = 5
            };

            modelBuilder.Entity<UsersDAL>().HasData(
                new UsersDAL[]
                {
                    user
                }
            );

            modelBuilder.Entity<PictureDAL>().HasData(
                new PictureDAL[]
                {
                    new PictureDAL
                    {
                        Id = 1,
                        Image = "",
                        UserId = user.Id
                    }
                }
            );

            // Task Entities
            modelBuilder.Entity<TaskDAL>().HasData(
                new TaskDAL[]
                {
                    new TaskDAL { Id = 1, Name = "Task1", StartDate = DateTime.Now },
                    new TaskDAL { Id = 2, Name = "Task2", StartDate = DateTime.Now },
                    new TaskDAL { Id = 3, Name = "Task3", StartDate = DateTime.Now }
                }
            );
            modelBuilder.Entity<TaskStateDAL>().HasData(
                new TaskStateDAL[]
                {
                    new TaskStateDAL{Id = 1, Name = "To Do"},
                    new TaskStateDAL{Id = 2, Name = "In Progress"},
                    new TaskStateDAL{Id = 3, Name = "Completed"}
                }
            );

            //
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
                     new SprintDAL(){ Sprint_id=1, SprintStatus_id=3, Description="Description", EndDate=new DateTime(2019,5,22), StartDate=new DateTime(2019,5,1), Name="SPRINT 1"},
                     new SprintDAL(){ Sprint_id=2, SprintStatus_id=2, Description="Description", EndDate=new DateTime(2019,6,11), StartDate=new DateTime(2019,5,24), Name="SPRINT 2"}
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

            modelBuilder.Entity<StoryStateDAL>().HasData(
                new StoryStateDAL[]
                {
                    new StoryStateDAL{StoryState_id=1, Name = "Not Selected"},
                    new StoryStateDAL{StoryState_id=2, Name = "Selected"},
                    new StoryStateDAL{StoryState_id=3, Name = "In Progress"},
                    new StoryStateDAL{StoryState_id=4, Name = "Testing"},
                    new StoryStateDAL{StoryState_id=5, Name = "Done"},
                    new StoryStateDAL{StoryState_id=6, Name = "Rejected"}
                }
            );
            modelBuilder.Entity<StoryDAL>().HasData(
                new StoryDAL[]
                {
                    new StoryDAL
                    {
                        Story_id =9,
                        sprint_id =1,
                        StoryPoints=12,
                        Name ="Something important to do",
                        Description = "Short desc.",
                        Rank = 2,
                        StoryState_id = 1
                    },
                    new StoryDAL
                    {
                        Story_id =10,
                        sprint_id =1,
                        StoryPoints=4,
                        Name ="Add Something important 1",
                        Description = "Medium size description, sample text and something else...",
                        Rank = 3,
                        StoryState_id = 1
                    },
                    new StoryDAL
                    {
                        Story_id =11,
                        sprint_id =1,
                        StoryPoints=50,
                        Name ="Add Something important 2",
                        Description = "Long loong longLong longng lng log longLong longLg longg longLog longLg ng long description",
                        Rank = 15,
                        StoryState_id = 1
                    },
                    new StoryDAL
                    {
                        Story_id =1,
                        sprint_id =1,
                        StoryPoints=40,
                        Name ="Add something usefull",
                        StartDate = new DateTime(2019, 5,1),
                        EndDate = new DateTime(2019, 5, 3),
                        Description = "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description",
                        Rank = 12,
                        StoryState_id = 1
                    },
                    new StoryDAL
                    {
                        Story_id =2,
                        sprint_id =1,
                        StoryPoints=5,
                        Name ="Add something usefull",
                        StartDate = new DateTime(2019, 5,1),
                        EndDate = new DateTime(2019, 5, 5),
                        Description = "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description",
                        Rank = 12,
                        StoryState_id = 5
                    },
                    new StoryDAL
                    {
                        Story_id =3,
                        sprint_id =1,
                        StoryPoints = 10,
                        StartDate = new DateTime(2019, 5,1),
                        EndDate = new DateTime(2019, 5, 15),
                        Name ="Fix very bad bug",
                        Description = "The shortest description",
                        Rank = 4,
                        StoryState_id = 5
                    },
                    new StoryDAL
                    {
                        Story_id =4,
                        sprint_id = 2,
                        StoryPoints = 20,
                        StartDate = new DateTime(2019, 5,24),
                        EndDate = new DateTime(2019, 5, 30),
                        Name ="Test something",
                        Description = "Description3",
                        Rank = 40,
                        StoryState_id=5
                    },
                    new StoryDAL
                    {
                        Story_id =5,
                        sprint_id = 2,
                        StoryPoints = 30,
                        StartDate = new DateTime(2019, 5,24),
                        EndDate = new DateTime(2019, 6, 3),
                        Name ="Create chart",
                        Description = "Description4",
                        Rank = 40,
                        StoryState_id=5
                    },
                    new StoryDAL
                    {
                        Story_id =6,
                        sprint_id = 2,
                        StoryPoints = 15,
                        StartDate = new DateTime(2019, 5,24),
                        EndDate = new DateTime(2019, 6, 7),
                        Name ="Create chat",
                        Description = "Description4",
                        Rank = 40,
                        StoryState_id=5
                    },
                    new StoryDAL
                    {
                        Story_id =7,
                        sprint_id = 2,
                        StoryPoints = 10,
                        StartDate = new DateTime(2019, 5,24),
                        EndDate = new DateTime(2019, 6, 8),
                        Name ="Create team entity",
                        Description = "Description4",
                        Rank = 40,
                        StoryState_id=5
                    },
                    new StoryDAL
                    {
                        Story_id =8,
                        sprint_id = 2,
                        StoryPoints = 5,
                        StartDate = new DateTime(2019, 5,24),
                        EndDate = new DateTime(2019, 6, 11),
                        Name ="Create team controller",
                        Description = "Description4",
                        Rank = 40,
                        StoryState_id=5
                    }
                }
            );
            modelBuilder.Entity<TeamDAL>().HasData(
                new TeamDAL[]
                {
                    new TeamDAL{TeamID = 1, Name = "Lv-396.1 .Net", Project = "Scrumban"},
                    new TeamDAL{TeamID = 2, Name = "New Team", Project = "New Project"}
                }
            );
            base.OnModelCreating(modelBuilder);
        }

        // generating password hash
        private string generatePasswordHash(string inputPassword)
        {
            SHA512 sha512 = SHA512.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputPassword);
            byte[] hash = sha512.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}
