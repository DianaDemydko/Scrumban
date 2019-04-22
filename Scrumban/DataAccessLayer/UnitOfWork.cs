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
        private IDefectRepository _defectRepository;
        private IStoryRepository _storyRepository;
        private IStoryStateRepository _storyStateRepository;
        private ITaskRepository _taskRepository;
        private IFeatureRepository _feature_repository;
        private IUserRepository _userRepository;
        private ITokenRefreshRepository _tokenRefreshRepository;
        private ITaskChangeHistoryRepository _taskChangeHistoryRepository;

        public UnitOfWork(ScrumbanContext scrumbanContext)
        {
            _scrumbanContext = scrumbanContext;
        }

        public IFeatureRepository Feature
        {
            get
            {
                if (_feature_repository == null)
                    _feature_repository = new FeatureRepository(_scrumbanContext);

                return _feature_repository;
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
                if (_defectRepository == null)
                {
                    _defectRepository = new DefectRepository(_scrumbanContext);
                }
                return _defectRepository;
            }
        }
        public IStoryRepository StoryRepository
        {
            get
            {
                if (_storyRepository == null)
                {
                    _storyRepository = new StoryRepository(_scrumbanContext);
                }
                return _storyRepository;
            }
        }

        public IStoryStateRepository StoryStateRepository
        {
            get
            {
                if(_storyStateRepository == null)
                {
                    _storyStateRepository = new StoryStateRepository(_scrumbanContext);
                }
                return _storyStateRepository;
            }
        }

        public ITaskRepository Tasks
        {
            get
            {
                if (_taskRepository == null)
                {
                    _taskRepository = new TaskRepository(_scrumbanContext);
                }
                return _taskRepository;
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

        public ITokenRefreshRepository TokenRefreshRepository
        {
            get
            {
                if(_tokenRefreshRepository == null)
                {
                    _tokenRefreshRepository = new TokenRefreshRepository(_scrumbanContext);
                }
                return _tokenRefreshRepository;
            }
        }
        
        public ITaskChangeHistoryRepository TaskChangeHistoryRepository
        {
            get
            {
                if(_taskChangeHistoryRepository == null)
                {
                    _taskChangeHistoryRepository = new TaskChangeHistoryRepository(_scrumbanContext);
                }
                return _taskChangeHistoryRepository;
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
