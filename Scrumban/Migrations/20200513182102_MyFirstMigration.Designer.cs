﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Scrumban.DataAccessLayer;

namespace Scrumban.Migrations
{
    [DbContext(typeof(ScrumbanContext))]
    [Migration("20200513182102_MyFirstMigration")]
    partial class MyFirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.DefectDAL", b =>
                {
                    b.Property<int>("DefectId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("Priority");

                    b.Property<string>("Severity");

                    b.Property<string>("State");

                    b.Property<string>("Status");

                    b.Property<int?>("StoryId");

                    b.HasKey("DefectId");

                    b.ToTable("Defects");

                    b.HasData(
                        new { DefectId = 1, Description = "Descriprion_1", Name = "Defect_1", Priority = "Medium", Severity = "Medium", State = "To Do", Status = "Open", StoryId = 1 },
                        new { DefectId = 2, Description = "Descriprion_2", Name = "Some Defect", Priority = "High", Severity = "Critical", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 3, Description = "Descriprion_3", Name = "Menu", Priority = "High", Severity = "Medium", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 4, Description = "Descriprion_3", Name = "Autorization", Priority = "High", Severity = "Critical", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 5, Description = "Descriprion_5", Name = "Pagination", Priority = "High", Severity = "Critical", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 6, Description = "Descriprion_7", Name = "KanbanBoard", Priority = "High", Severity = "Critical", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 7, Description = "Descriprion_9", Name = "BusinessLogic", Priority = "High", Severity = "Medium", State = "In progress", Status = "Open", StoryId = 1 },
                        new { DefectId = 8, Description = "Descriprion_1", Name = "ConnectToDatabase", Priority = "High", Severity = "Critical", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 9, Description = "Descriprion_2", Name = "Style", Priority = "High", Severity = "Critical", State = "To Do", Status = "Open", StoryId = 1 },
                        new { DefectId = 10, Description = "Descriprion_3", Name = "Defect_5", Priority = "Medium", Severity = "Medium", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 11, Description = "Descriprion_5", Name = "Defect_3", Priority = "Medium", Severity = "Medium", State = "In progress", Status = "Open", StoryId = 1 },
                        new { DefectId = 12, Description = "Descriprion_2", Name = "Defect_9", Priority = "Low", Severity = "Medium", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 13, Description = "Descriprion_1", Name = "Defect_10", Priority = "Medium", Severity = "Low", State = "To Do", Status = "Open", StoryId = 1 },
                        new { DefectId = 14, Description = "Descriprion_8", Name = "Defect_12", Priority = "High", Severity = "Low", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 15, Description = "Descriprion_2", Name = "Defect_18", Priority = "Low", Severity = "Medium", State = "In progress", Status = "Open", StoryId = 1 },
                        new { DefectId = 16, Description = "Descriprion_1", Name = "Defect_20", Priority = "Medium", Severity = "Low", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 17, Description = "Descriprion_8", Name = "Defect_11", Priority = "Low", Severity = "Medium", State = "In progress", Status = "Open", StoryId = 1 },
                        new { DefectId = 18, Description = "Descriprion_2", Name = "Defect_14", Priority = "Medium", Severity = "Low", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 19, Description = "Descriprion_5", Name = "Defect_17", Priority = "Low", Severity = "Medium", State = "To Do", Status = "Open", StoryId = 1 },
                        new { DefectId = 20, Description = "Descriprion_2", Name = "Defect_30", Priority = "Low", Severity = "Low", State = "Done", Status = "Close", StoryId = 1 },
                        new { DefectId = 21, Description = "Descriprion_1", Name = "Defect_12", Priority = "Medium", Severity = "Medium", State = "In progress", Status = "Open", StoryId = 1 }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.FeatureDAL", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int?>("OwnerID");

                    b.Property<int?>("PriorityID");

                    b.Property<int?>("StateID");

                    b.Property<DateTime>("Time");

                    b.HasKey("ID");

                    b.HasIndex("OwnerID");

                    b.HasIndex("PriorityID");

                    b.HasIndex("StateID");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.OwnerDAL", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("OwnerDAL");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.PictureDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Image");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Pictures");

                    b.HasData(
                        new { Id = 1, Image = "", UserId = 1 }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.PriorityDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Priorities");

                    b.HasData(
                        new { Id = 1, Name = "Low" },
                        new { Id = 2, Name = "Medium" },
                        new { Id = 3, Name = "Heigh" },
                        new { Id = 4, Name = "Immediate" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.RoleDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new { Id = 1, Name = "Team Member" },
                        new { Id = 2, Name = "Scrum Master" },
                        new { Id = 3, Name = "Product Owner" },
                        new { Id = 5, Name = "Admin" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.SprintDAL", b =>
                {
                    b.Property<int>("Sprint_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<DateTime>("EndDate");

                    b.Property<string>("Name");

                    b.Property<int>("SprintStatus_id");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Sprint_id");

                    b.HasIndex("SprintStatus_id");

                    b.ToTable("Sprint");

                    b.HasData(
                        new { Sprint_id = 1, Description = "Description", EndDate = new DateTime(2019, 5, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "SPRINT 1", SprintStatus_id = 3, StartDate = new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                        new { Sprint_id = 2, Description = "Description", EndDate = new DateTime(2019, 6, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "SPRINT 2", SprintStatus_id = 2, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.SprintStatusDAL", b =>
                {
                    b.Property<int>("SprintStatus_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("StatusName");

                    b.HasKey("SprintStatus_id");

                    b.ToTable("SprintStatus");

                    b.HasData(
                        new { SprintStatus_id = 1, StatusName = "Not Started" },
                        new { SprintStatus_id = 2, StatusName = "Started" },
                        new { SprintStatus_id = 3, StatusName = "Completed" },
                        new { SprintStatus_id = 4, StatusName = "Canceled" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.StateDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("States");

                    b.HasData(
                        new { Id = 1, Name = "Ready To Start" },
                        new { Id = 2, Name = "In Progress" },
                        new { Id = 3, Name = "Development Complete" },
                        new { Id = 4, Name = "Test Complete" },
                        new { Id = 5, Name = "Accepted" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.StoryDAL", b =>
                {
                    b.Property<int>("Story_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<DateTime?>("EndDate");

                    b.Property<int?>("FeatureId");

                    b.Property<string>("Name");

                    b.Property<int>("Rank");

                    b.Property<DateTime?>("StartDate");

                    b.Property<int>("StoryPoints");

                    b.Property<int>("StoryState_id");

                    b.Property<int>("sprint_id");

                    b.HasKey("Story_id");

                    b.HasIndex("FeatureId");

                    b.HasIndex("StoryState_id");

                    b.ToTable("Story");

                    b.HasData(
                        new { Story_id = 9, Description = "Short desc.", Name = "Something important to do", Rank = 2, StoryPoints = 12, StoryState_id = 1, sprint_id = 1 },
                        new { Story_id = 10, Description = "Medium size description, sample text and something else...", Name = "Add Something important 1", Rank = 3, StoryPoints = 4, StoryState_id = 1, sprint_id = 1 },
                        new { Story_id = 11, Description = "Long loong longLong longng lng log longLong longLg longg longLog longLg ng long description", Name = "Add Something important 2", Rank = 15, StoryPoints = 50, StoryState_id = 1, sprint_id = 1 },
                        new { Story_id = 1, Description = "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description", EndDate = new DateTime(2019, 5, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Add something usefull", Rank = 12, StartDate = new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 40, StoryState_id = 1, sprint_id = 1 },
                        new { Story_id = 2, Description = "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description", EndDate = new DateTime(2019, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Add something usefull", Rank = 12, StartDate = new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 5, StoryState_id = 5, sprint_id = 1 },
                        new { Story_id = 3, Description = "The shortest description", EndDate = new DateTime(2019, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Fix very bad bug", Rank = 4, StartDate = new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 10, StoryState_id = 5, sprint_id = 1 },
                        new { Story_id = 4, Description = "Description3", EndDate = new DateTime(2019, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Test something", Rank = 40, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 20, StoryState_id = 5, sprint_id = 2 },
                        new { Story_id = 5, Description = "Description4", EndDate = new DateTime(2019, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Create chart", Rank = 40, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 30, StoryState_id = 5, sprint_id = 2 },
                        new { Story_id = 6, Description = "Description4", EndDate = new DateTime(2019, 6, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Create chat", Rank = 40, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 15, StoryState_id = 5, sprint_id = 2 },
                        new { Story_id = 7, Description = "Description4", EndDate = new DateTime(2019, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Create team entity", Rank = 40, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 10, StoryState_id = 5, sprint_id = 2 },
                        new { Story_id = 8, Description = "Description4", EndDate = new DateTime(2019, 6, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), Name = "Create team controller", Rank = 40, StartDate = new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), StoryPoints = 5, StoryState_id = 5, sprint_id = 2 }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.StoryStateDAL", b =>
                {
                    b.Property<int>("StoryState_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("StoryState_id");

                    b.ToTable("StoryStates");

                    b.HasData(
                        new { StoryState_id = 1, Name = "Not Selected" },
                        new { StoryState_id = 2, Name = "Selected" },
                        new { StoryState_id = 3, Name = "In Progress" },
                        new { StoryState_id = 4, Name = "Testing" },
                        new { StoryState_id = 5, Name = "Done" },
                        new { StoryState_id = 6, Name = "Rejected" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TaskChangeHistoryDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime");

                    b.Property<string>("Description");

                    b.Property<string>("Operation");

                    b.Property<int>("TaskId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("TaskChangeHistories");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TaskDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<DateTime?>("FinishDate");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("PriorityId");

                    b.Property<DateTime?>("StartDate");

                    b.Property<int?>("StoryId");

                    b.Property<int>("TaskStateId");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("PriorityId");

                    b.HasIndex("StoryId");

                    b.HasIndex("TaskStateId");

                    b.HasIndex("UserId");

                    b.ToTable("Tasks");

                    b.HasData(
                        new { Id = 1, Name = "Task1", PriorityId = 1, StartDate = new DateTime(2020, 5, 13, 21, 21, 1, 737, DateTimeKind.Local), TaskStateId = 1 },
                        new { Id = 2, Name = "Task2", PriorityId = 1, StartDate = new DateTime(2020, 5, 13, 21, 21, 1, 739, DateTimeKind.Local), TaskStateId = 1 },
                        new { Id = 3, Name = "Task3", PriorityId = 1, StartDate = new DateTime(2020, 5, 13, 21, 21, 1, 739, DateTimeKind.Local), TaskStateId = 1 }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TaskStateDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("TaskStates");

                    b.HasData(
                        new { Id = 1, Name = "To Do" },
                        new { Id = 2, Name = "In Progress" },
                        new { Id = 3, Name = "Completed" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TeamDAL", b =>
                {
                    b.Property<int>("TeamID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<string>("Project");

                    b.HasKey("TeamID");

                    b.ToTable("Teams");

                    b.HasData(
                        new { TeamID = 1, Name = "Lv-396.1 .Net", Project = "Scrumban" },
                        new { TeamID = 2, Name = "New Team", Project = "New Project" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TokenRefreshDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ExpiresTime");

                    b.Property<DateTime>("IssuedTime");

                    b.Property<string>("Token");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("TokenRefresh");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.UsersDAL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<int>("RoleId");

                    b.Property<string>("Surname");

                    b.Property<int?>("TeamId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("TeamId");

                    b.ToTable("Users");

                    b.HasData(
                        new { Id = 1, Email = "admin@gmail.com", FirstName = "Name", Password = "43192475F95E3820FE441DAAFF7C84D9B73CA3A5AFC7309AE03F783151B6B0976E4D68CD990F97AD0D65CA640D35A407199D6D7510F1DFF5477B8CFCE1531475", RoleId = 5, Surname = "Surname" }
                    );
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.FeatureDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.OwnerDAL", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerID");

                    b.HasOne("Scrumban.DataAccessLayer.Models.PriorityDAL", "Priority")
                        .WithMany()
                        .HasForeignKey("PriorityID");

                    b.HasOne("Scrumban.DataAccessLayer.Models.StateDAL", "State")
                        .WithMany()
                        .HasForeignKey("StateID");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.PictureDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.UsersDAL", "User")
                        .WithOne("Picture")
                        .HasForeignKey("Scrumban.DataAccessLayer.Models.PictureDAL", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.SprintDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.SprintStatusDAL", "Status")
                        .WithMany()
                        .HasForeignKey("SprintStatus_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.StoryDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.FeatureDAL", "Feature")
                        .WithMany("Stories")
                        .HasForeignKey("FeatureId");

                    b.HasOne("Scrumban.DataAccessLayer.Models.StoryStateDAL", "StoryState")
                        .WithMany()
                        .HasForeignKey("StoryState_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TaskChangeHistoryDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.TaskDAL", "Task")
                        .WithMany("taskChangeHistories")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Scrumban.DataAccessLayer.Models.UsersDAL", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.TaskDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.PriorityDAL", "Priority")
                        .WithMany()
                        .HasForeignKey("PriorityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Scrumban.DataAccessLayer.Models.StoryDAL", "Story")
                        .WithMany("Tasks")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Scrumban.DataAccessLayer.Models.TaskStateDAL", "TaskState")
                        .WithMany()
                        .HasForeignKey("TaskStateId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Scrumban.DataAccessLayer.Models.UsersDAL", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Scrumban.DataAccessLayer.Models.UsersDAL", b =>
                {
                    b.HasOne("Scrumban.DataAccessLayer.Models.RoleDAL", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Scrumban.DataAccessLayer.Models.TeamDAL", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId");
                });
#pragma warning restore 612, 618
        }
    }
}