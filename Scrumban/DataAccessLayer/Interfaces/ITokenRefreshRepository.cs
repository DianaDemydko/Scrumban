using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Interfaces
{
    public interface ITokenRefreshRepository
    {
        void createRefreshToken(TokenRefreshDAL tokenRefreshDAL);
        bool checkRefreshToken(TokenRefreshDAL tokenRefreshDAL);
    }
}
