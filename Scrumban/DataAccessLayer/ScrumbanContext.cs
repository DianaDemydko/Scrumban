using System;
using System.Collections.Generic;
using System.Linq;
using Scrumban.BusinessLogicLayer.DTO;
using CustomIdentityApp.Models;
using Microsoft.EntityFrameworkCore;
using Scrumban.Models;
using Scrumban.Models.Entities;


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
        public DbSet<Models.State> States { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskState> TaskStates { get; set; }
        public DbSet<Models.Priority> Priorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
