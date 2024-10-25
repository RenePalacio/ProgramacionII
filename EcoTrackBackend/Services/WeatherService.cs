using System.Threading.Tasks;

namespace EcoTrackBackend.Services
{
    public class WeatherService
    {
        private readonly ApiService _apiService;
        private readonly string _apiKey = "658bf0af8b7d9dd388caa996c55f7d99"; // Tu API Key

        public WeatherService(ApiService apiService)
        {
            _apiService = apiService;
        }

        // Método para obtener datos del clima
        public async Task<WeatherResponse> GetWeatherData(double latitude, double longitude)
        {
            var endpoint = $"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={_apiKey}&units=metric";
            return await _apiService.GetDataFromApi<WeatherResponse>(endpoint);
        }
    }

    // Modelo para la respuesta del clima
    public class WeatherResponse
    {
        public Main main { get; set; } = new Main(); // Inicialización
        public Weather[] weather { get; set; } = Array.Empty<Weather>(); // Inicialización
        public string name { get; set; } = string.Empty; // Inicialización
    }

    public class Main
    {
        public float temp { get; set; }
        public float feels_like { get; set; }
        public float humidity { get; set; }
    }

    public class Weather
    {
        public string description { get; set; } = string.Empty; // Inicialización
    }
}
