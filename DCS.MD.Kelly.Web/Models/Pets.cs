namespace DCS.MD.Kelly.Web.Models
{
    public class PetStats
    {
        public int Laziness { get; set; }
        public int Greediness { get; set; }
        public int Cuddliness { get; set; }
        public int ChaosLevel { get; set; }
        public int Intelligence { get; set; }
        public int Cuteness { get; set; }
    }

    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Alias { get; set; } = "";
        public string Bio { get; set; } = "";
        public string DefiningFeature { get; set; } = "";
        public string Status { get; set; } = "alive";
        public string GotchaDate { get; set; } = "";
        public string Emoji { get; set; } = "🐾";
        public string Photo { get; set; }
        public PetStats Stats { get; set; } = new();

        public bool IsAlive => Status.ToLower() == "alive";

        public DateTime ParsedGotchaDate => DateTime.Parse(GotchaDate);

        public string GotchaAge
        {
            get
            {
                var now = DateTime.Now;
                var diff = now - ParsedGotchaDate;
                var years = (int)(diff.TotalDays / 365);
                var months = (int)((diff.TotalDays % 365) / 30);
                if (years > 0) return $"{years}y {months}m";
                if (months > 0) return $"{months} months";
                return $"{(int)diff.TotalDays} days";
            }
        }
    }
}
