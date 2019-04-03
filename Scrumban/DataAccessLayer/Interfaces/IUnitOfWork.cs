using Scrumban.DataAccessLayer.Models;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface IUnitOfWork
    {
        IDefectRepository Defects { get; }
        IStoryRepository Stories { get; }
        ITaskRepository Tasks { get; }
        IFeatureRepository Feature { get; }
        ISprintRepository SprintRepository { get; }
        ISprintStatusRepository SprintStatusRepository { get; }
        IUserRepository UserRepository { get; }

        int Save();
        void Dispose();

        

    }
}
