using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json; // Asegúrate de tener esta referencia

namespace EcoTrackBackend.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<T> GetDataFromApi<T>(string endpoint) where T : class, new()
{
    try
    {
        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<T>(content);

        return result ?? new T(); // Devuelve un nuevo objeto si el resultado es nulo
    }
    catch (HttpRequestException ex)
    {
        // Manejar el error según sea necesario
        throw new Exception("Error al acceder a la API", ex);
    }
}

        
    }
}
