using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.Models
{
    public class ScrumbanContext : DbContext
    {
        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<TaskState> TaskStates { get; set; }
        public DbSet<Priority> Priorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskState>().HasData(
                new TaskState[]
                {
                    new TaskState{Id = 1, Name = "To do"},
                    new TaskState{Id = 2, Name = "In progress"},
                    new TaskState{Id = 3, Name = "Completed"}
                }
            );
            modelBuilder.Entity<State>().HasData(
                new State[]
                {
                    new State{Id = 1, Name = "Ready to start"},
                    new State{Id = 2, Name = "In progress"},
                    new State{Id = 3, Name = "Development complete"},
                    new State{Id = 4, Name = "Test complete"},
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
                    new Models.Task { Id = 1, Name = "Task1" },
                    new Models.Task { Id = 2, Name = "Task2" },
                    new Models.Task { Id = 3, Name = "Task3" }
                }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
