namespace DCS.MD.Kelly.Web.Models
{
    public class TimelineEntry
    {
        public int Id { get; set; }
        public string Date { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Emoji { get; set; } = "💛";
        public string Category { get; set; } = "";

        public DateTime ParsedDate => DateTime.Parse(Date);
    }
}
