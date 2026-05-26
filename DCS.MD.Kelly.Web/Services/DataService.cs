using System.Net.Http.Json;
using DCS.MD.Kelly.Web.Models;

namespace DCS.MD.Kelly.Web.Services
{
    public class DataService
    {
        private readonly HttpClient _http;

        public DataService(HttpClient http) => _http = http;

        public async Task<List<TimelineEntry>> GetTimelineAsync()
            => await _http.GetFromJsonAsync<List<TimelineEntry>>("data/timeline.json") ?? new();

        public async Task<List<MapLocation>> GetMapLocationsAsync()
            => await _http.GetFromJsonAsync<List<MapLocation>>("data/map-locations.json") ?? new();
    }
}
