using System;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;

namespace Scrumban.DataAccessLayer
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ScrumbanContext _scrumbanContext;

        private ISprintRepository _sprintRepository;
        private ISprintStatusRepository _sprintStatusRepository;
        private IDefectRepository defectRepository;
        private IStoryRepository storyRepository;
        private ITaskRepository taskRepository;
        private IFeatureRepository feature_repository;
        private IUserRepository _userRepository;

        public UnitOfWork(ScrumbanContext scrumbanContext)
        {
            _scrumbanContext = scrumbanContext;
        }

         public IFeatureRepository Feature
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

        public IDefectRepository Defects
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
        public IStoryRepository Stories
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

        public ITaskRepository Tasks
        {
            get
            {
                if (taskRepository == null)
                {
                    taskRepository = new TaskRepository(_scrumbanContext);
                }
                return taskRepository;
            }
        }

        

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
