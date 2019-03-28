using Microsoft.EntityFrameworkCore;
using Scrumban.Models.Entities;
using CustomIdentityApp.Models;

namespace Scrumban.DataAccessLayer
{
    public class ScrumbanContext : DbContext
    {
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<TaskState> TaskStates { get; set; }
        public DbSet<Priority> Priorities { get; set; }

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
            modelBuilder.Entity<Task>().HasData(
                new Task[]
                {
                    new Task { Id = 1, Name = "Task1" },
                    new Task { Id = 2, Name = "Task2" },
                    new Task { Id = 3, Name = "Task3" }
                }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
