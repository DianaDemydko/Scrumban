using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class TokenRefreshRepository : ITokenRefreshRepository
    {
        protected readonly ScrumbanContext _dbContext;

        public TokenRefreshRepository(ScrumbanContext context)
        {
            _dbContext = context;
        }

        public bool checkRefreshToken(TokenRefreshDAL tokenRefreshDAL)
        {
            TokenRefreshDAL tokenRefresh = _dbContext.TokenRefresh.FirstOrDefault(x => x.UserId == tokenRefreshDAL.UserId);
            if(tokenRefresh != null)
            {
                if(tokenRefreshDAL.Token != null && tokenRefresh.Token == tokenRefreshDAL.Token)
                {
                    return true;
                }
                else
                {
                    tokenRefresh.Token = null;
                    _dbContext.SaveChanges();
                    return false;
                }
            }
            return false; 
        }

        public void createRefreshToken(TokenRefreshDAL tokenRefreshDAL)
        {
            TokenRefreshDAL oldTokenRefreshDAL = _dbContext.TokenRefresh.FirstOrDefault(x => x.UserId == tokenRefreshDAL.UserId);
            if(oldTokenRefreshDAL == null)
            {
                _dbContext.Add(tokenRefreshDAL);
            }
            else
            {
                oldTokenRefreshDAL.Token = tokenRefreshDAL.Token;
                oldTokenRefreshDAL.IssuedTime = tokenRefreshDAL.IssuedTime;
                oldTokenRefreshDAL.ExpiresTime = tokenRefreshDAL.ExpiresTime;
            }
            
        }
    }
}
