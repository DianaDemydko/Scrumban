﻿namespace Scrumban.DataAccessLayer.Models
{
    public class GetIssuesResponse
    {
    //    public Issue[] Issues { get; set; }//-
    //} //-
    //public class Issue//-
    //{//-
        public int Id { get; set; }
        public string Key { get; set; }
        public Fields Fields { get; set; }
    }

    public class Fields
    {
        public string Summary { get; set; }
        public Status Status { get; set; }
    }

    public class Status
    {
        public string Name { get; set; }
    }
}
