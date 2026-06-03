using System.Net.Http.Json;
using DCS.MD.Kelly.Web.Models;

namespace DCS.MD.Kelly.Web.Services
{
    public class DataService
    {
        private readonly HttpClient _http;

        public DataService(HttpClient http) => _http = http;

        public async Task<List<TimelineEntry>> GetTimelineAsync()
            => await _http.GetFromJsonAsync<List<TimelineEntry>>("Data/timeline.json") ?? new();

        public async Task<List<MapLocation>> GetMapLocationsAsync()
            => await _http.GetFromJsonAsync<List<MapLocation>>("Data/map-locations.json") ?? new();

        public async Task<List<Pet>> GetPetsAsync()
            => await _http.GetFromJsonAsync<List<Pet>>("Data/pets.json") ?? new();

        public async Task<List<Reason>> GetReasonsAsync()
            => await _http.GetFromJsonAsync<List<Reason>>("Data/reasons.json") ?? new();
    }
}
