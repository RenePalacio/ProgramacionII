using Microsoft.AspNetCore.Mvc; // Importar el espacio de nombres correcto
using EcoTrackBackend.Services; // Importar los servicios
using EcoTrack; // Importar el contexto de la base de datos
using EcoTrack.Models; // Modelos para los datos del clima
using System.Threading.Tasks; // Para métodos asincrónicos
using Microsoft.EntityFrameworkCore; // Para el uso de consultas EF

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;
        private readonly EcoTrackDbContext _context;

        // Constructor
        public WeatherController(WeatherService weatherService, EcoTrackDbContext context)
        {
            _weatherService = weatherService ?? throw new ArgumentNullException(nameof(weatherService));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Método para obtener los datos climáticos desde la base de datos
        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetWeatherData(int activityId)
        {
            try
            {
                var datosClima = await _context.DatosClima
                    .FirstOrDefaultAsync(d => d.IdActividad == activityId);

                if (datosClima == null)
                {
                    return NotFound("No se encontraron datos climáticos para la actividad especificada.");
                }

                return Ok(datosClima);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        // Método para obtener y guardar los datos de clima y UV
        [HttpPost("{activityId}/fetch-and-save")]
        public async Task<IActionResult> FetchAndSaveWeatherData(int activityId, double latitude, double longitude)
        {
            try
            {
                var weatherData = await _weatherService.GetWeatherData(latitude, longitude);
                if (weatherData == null)
                {
                    return NotFound("No se encontraron datos climáticos.");
                }

                // Aquí podrías agregar la lógica para obtener y almacenar el índice UV

                var datosClima = new DatosClima
                {
                    IdActividad = activityId,
                    Temperatura = weatherData.main.temp,
                    Humedad = weatherData.main.humidity,
                    Descripcion = weatherData.weather[0].description,
                    Fecha = DateTime.Now,
                    RayosUV = 10.06F, // Simulación o lógica para el índice UV
                    ProbabilidadLluvia = 0,
                    CalidadAire = "Desconocido",
                    Polvo = "Desconocido"
                };

                await _context.DatosClima.AddAsync(datosClima);
                await _context.SaveChangesAsync();

                return Ok(datosClima);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }
    }
}
