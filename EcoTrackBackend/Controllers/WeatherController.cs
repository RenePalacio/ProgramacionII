using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models; // Importar el espacio de nombres de los modelos
using EcoTrackBackend.Services; // Importar el espacio de nombres del servicio 
using EcoTrack;   // Importar el espacio de nombres del DbContext

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;
        private readonly EcoTrackDbContext _context;

        public WeatherController(WeatherService weatherService, EcoTrackDbContext context)
        {
            _weatherService = weatherService;
            _context = context;
        }

        // Método para obtener y guardar los datos climáticos en la base de datos
        [HttpPost("{activityId}/fetch-and-save")]
        public async Task<IActionResult> FetchAndSaveWeatherData(int activityId, double latitude, double longitude)
        {
            try
            {
                // Obtener los datos climáticos desde la API de OpenWeatherMap
                var weatherData = await _weatherService.GetWeatherData(latitude, longitude);

                if (weatherData == null)
                {
                    return NotFound("No se encontraron datos climáticos.");
                }

                // Crear un nuevo registro de DatosClima basado en los datos obtenidos
                var datosClima = new DatosClima
                {
                    IdActividad = activityId,
                    Temperatura = weatherData.main.temp,
                    Humedad = weatherData.main.humidity,  // Asignar la Humedad
                    Descripcion = weatherData.weather[0].description,  // Asignar la Descripción
                    Fecha = DateTime.Now,  // Asignar la Fecha actual
                    RayosUV = 0,  // Asignar valores por defecto o adaptar según los datos disponibles
                    ProbabilidadLluvia = 0,
                    CalidadAire = "Desconocido",
                    Polvo = "Desconocido"
                };

                // Guardar los datos climáticos en la base de datos
                await _context.DatosClima.AddAsync(datosClima);
                await _context.SaveChangesAsync();

                // Devolver los datos almacenados
                return Ok(datosClima);
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción que ocurra y devolver un mensaje de error
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }
    }
}
