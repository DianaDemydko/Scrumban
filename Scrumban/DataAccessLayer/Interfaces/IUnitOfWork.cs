using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {
        IDefectRepository Defects { get; }
        IStoryRepository StoryRepository { get; }
        ITaskRepository Tasks { get; }
        IFeatureRepository Feature { get; }
        ISprintRepository SprintRepository { get; }
        ISprintStatusRepository SprintStatusRepository { get; }
        IUserRepository UserRepository { get; }
        IStoryStateRepository StoryStateRepository { get; }
        ITokenRefreshRepository TokenRefreshRepository { get; }
        ITaskChangeHistoryRepository TaskChangeHistoryRepository { get; }
        ITeamRepository TeamRepository { get; }
        int Save();
        void Dispose();



    }
}