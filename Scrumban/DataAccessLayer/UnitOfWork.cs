
using Scrumban.Models;
using System.Collections.Generic;
﻿using System;
using System.Linq;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.Models.Entities;
using Microsoft.EntityFrameworkCore.Storage;

namespace Scrumban.DataAccessLayer
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ScrumbanContext _scrumbanContext;

        private ISprintRepository _sprintRepository;
        private ISprintStatusRepository _sprintStatusRepository;
        private DefectRepository defectRepository;
        private StoryRepository storyRepository;
        private TaskRepository taskRepository;
        private FeatureRepository feature_repository;

        public UnitOfWork(ScrumbanContext scrumbanContext)
        {
            _scrumbanContext = scrumbanContext;
        }

         public FeatureRepository featureRepository
        {
            get
            {
                if (feature_repository == null)
                    feature_repository = new FeatureRepository(_scrumbanContext);

                return feature_repository;
            }
        }
      

        public ISprintRepository SprintRepository
        {
            get
            {
                if (_sprintRepository == null)
                {
                    _sprintRepository = new SprintRepository(_scrumbanContext);
                }

                return _sprintRepository;
            }
        }

        public ISprintStatusRepository SprintStatusRepository
        {
            get
            {
                if (_sprintStatusRepository == null)
                {
                    _sprintStatusRepository = new SprintStatusRepository(_scrumbanContext);
                }

                return _sprintStatusRepository;
            }
        }

        public IDefectRepository<Defect> Defects
        {
            get
            {
                if (defectRepository == null)
                {
                    defectRepository = new DefectRepository(_scrumbanContext);
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
                    storyRepository = new StoryRepository(_scrumbanContext);
                }
                return storyRepository;
            }
        }
        public IRepository<Task> Tasks
        {
            get
            {
                if (taskRepository == null)
                {
                    taskRepository = new TaskRepository(_scrumbanContext);
                }
                return taskRepository;
            }

        private IUserRepository _userRepository;

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_scrumbanContext);
                }

                return _userRepository;
            }
        }


        public int Save()
        {
            return _scrumbanContext.SaveChanges();
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _scrumbanContext.Dispose();
                }
            }
            this._disposed = true;
        }

         public void Dispose()

        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
