using System.Net.Http;
using System.Threading.Tasks;

namespace EcoTrackBackend.Services
{
    public class WeatherService
    {
        private readonly ApiService _apiService;
        private readonly string _apiKey = "e4dcbd0bdae363f4677eb600dcae7a32"; // Tu API Key

        public WeatherService(ApiService apiService)
        {
            _apiService = apiService;
        }

        // Método para obtener datos del clima
        public async Task<WeatherResponse> GetWeatherData(double latitude, double longitude)
        {
            var endpoint = $"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={_apiKey}&units=metric";
            var weatherResponse = await _apiService.GetDataFromApi<WeatherResponse>(endpoint);

            // Traducir la descripción del clima
            if (weatherResponse.weather.Length > 0)
            {
                weatherResponse.weather[0].description = TranslateWeatherDescription(weatherResponse.weather[0].description);
            }

            return weatherResponse;
        }

        // Método para traducir la descripción del clima
        private string TranslateWeatherDescription(string description)
        {
            return description switch
            {
                "clear sky" => "cielo despejado",
                "few clouds" => "pocas nubes",
                "scattered clouds" => "nubes dispersas",
                "broken clouds" => "nubes rotas",
                "shower rain" => "lluvia ligera",
                "rain" => "lluvia",
                "thunderstorm" => "tormenta eléctrica",
                "snow" => "nieve",
                "mist" => "niebla",
                "light rain" => "lluvia ligera",
                "overcast clouds" => "nublado",
                "haze" => "neblina",
                "fog" => "niebla",
                _ => description // Si no hay traducción, devuelve el original
            };
        }
    }

    // Modelos para la respuesta del clima
    public class WeatherResponse
    {
        public Main main { get; set; } = new Main();
        public Weather[] weather { get; set; } = Array.Empty<Weather>();
        public string name { get; set; } = string.Empty;
    }

    public class Main
    {
        public float temp { get; set; }
        public float feels_like { get; set; }
        public float humidity { get; set; }
    }

    public class Weather
    {
        public string description { get; set; } = string.Empty;
    }

 
}
