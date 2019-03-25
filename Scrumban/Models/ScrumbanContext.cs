﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.Models
{
    public class ScrumbanContext : DbContext
    {
        public DbSet<Defect> Defects { get; set; }

        public ScrumbanContext(DbContextOptions<ScrumbanContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
