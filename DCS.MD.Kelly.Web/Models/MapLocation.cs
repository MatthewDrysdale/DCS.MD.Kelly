namespace DCS.MD.Kelly.Web.Models
{
    public class MapLocation
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Country { get; set; } = "";
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Description { get; set; } = "";
        public string Date { get; set; } = "";
        public string Emoji { get; set; } = "📍";

        public DateTime ParsedDate => DateTime.Parse(Date);
    }
}
