﻿using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scrumban.DataAccessLayer
{
    public class UnitOfWork : IUnitOfWork
    {
        ScrumbanContext _context;
        private DefectRepository defectRepository;
        private StoryRepository storyRepository;

        public UnitOfWork(ScrumbanContext context)
        {
            _context = context;
        }

        public IDefectRepository<Defect> Defects
        {
            get
            {
                if (defectRepository == null)
                {
                    defectRepository = new DefectRepository(_context);
                }
                return defectRepository;
            }
        }
        public IRepository<Story> Stories
        {
            get
            {
                if (storyRepository == null)
                {
                    storyRepository = new StoryRepository(_context);
                }
                return storyRepository;
            }
        }

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        private bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}

