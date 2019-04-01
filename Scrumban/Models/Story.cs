using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scrumban.Models
{
    public class Story
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public int? FeatureID { set; get; }
        // public Feature Feature { set; get; }
    }
}
