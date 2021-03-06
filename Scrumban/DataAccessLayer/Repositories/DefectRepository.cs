﻿using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Models;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Scrumban.DataAccessLayer.Repositories
{
    public class DefectRepository : BaseRepository<DefectDAL>, IDefectRepository
    {
       
        public DefectRepository(ScrumbanContext context) : base(context)
        {
        }
        public override IQueryable<DefectDAL> GetAll()
        {
            return _dbContext.Defects.Include(x => x.User).ThenInclude(c => c.Picture).AsQueryable();
        }
        public override void Create(DefectDAL defect)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    _dbContext.Add(defect);
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Delete(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    DefectDAL defect = _dbContext.Defects.FirstOrDefault(x => x.DefectId == id);
                    if (defect == null)
                    {

                    }
                    _dbContext.Defects.Remove(defect);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }

        public override void Update(DefectDAL item)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    DefectDAL defect = _dbContext.Defects.FirstOrDefault(x => x.DefectId == item.DefectId);
                    if (defect == null)
                    {

                    }
                    defect.Name = item.Name;
                    defect.Description = item.Description;
                    defect.State = item.State;
                    defect.Severity = item.Severity;
                    defect.Priority = item.Priority;
                    defect.Status = item.Status;
                    defect.StoryId = item.StoryId;
                    defect.UserId = item.UserId;
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
        }
    }
}

