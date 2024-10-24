using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EcoTrackBackend.Services
{
    public class OpenUvService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OpenUvService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _apiKey = "openuv-b2n6tyrm2ldsbq8-io"; // Reemplaza "TU_API_KEY" con tu clave API de OpenUV
        }

public async Task<OpenUvResponse?> GetUvDataAsync(double latitude, double longitude)
{
    var endpoint = $"https://api.openuv.io/api/v1/uv?lat={latitude}&lng={longitude}";
    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
    
    var response = await _httpClient.GetAsync(endpoint);
    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<OpenUvResponse?>(content); // Asegúrate de que pueda ser nulo
}

    }

public class OpenUvResponse
{
    public Result? result { get; set; } // Cambia a Result? para permitir nulos
}


    public class Result
    {
        public float uv { get; set; }
        public float uv_clear { get; set; }
        public float uv_index { get; set; }
        // Agrega más propiedades según la respuesta de la API
    }
}
