namespace Scrumban.ServiceLayer.DTO
{
    public class StoryDTO
    {
        public int Story_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rank { get; set; } 

        public StoryStateDTO StoryState { get; set; }
    }
}
