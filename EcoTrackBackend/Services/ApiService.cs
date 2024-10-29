using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EcoTrackBackend.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<T?> GetDataFromApi<T>(string endpoint) 
        {
            var response = await _httpClient.GetAsync(endpoint);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync(); 
            var data = JsonConvert.DeserializeObject<T>(jsonString); 
            
            return data;
        }
    }
}
