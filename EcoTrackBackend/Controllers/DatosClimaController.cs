using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EcoTrack.Models;
using EcoTrackBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace EcoTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatosClimaController : ControllerBase
    {
        public readonly WeatherService _weatherService;
        public readonly EcoTrackDbContext _context;

        public DatosClimaController(WeatherService weatherService, EcoTrackDbContext context)
        {
            _weatherService = weatherService;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<DatosClima>> CrearDatosClima([FromBody] CreateDatosClimaDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Obtener datos del clima
                var weatherResponse = await _weatherService.GetWeatherData(dto.Latitude, dto.Longitude);

                // Crear el nuevo objeto DatosClima
                var datosClima = new DatosClima
                {
                    IdActividad = dto.IdActividad,
                    Temperatura = weatherResponse.main.temp,
                    Humedad = weatherResponse.main.humidity,
                    Descripcion = weatherResponse.weather.Length > 0 
                                  ? weatherResponse.weather[0].description 
                                  : "Descripción no disponible",
                    // Asigna valores para IndiceUV y RecomendacionUV si están disponibles,
                    // o asigna valores predeterminados
                    IndiceUV = 0, // Cambia esto si tienes datos para UV
                    RecomendacionUV = "N/A" // Cambia esto si tienes lógica para recomendaciones UV
                };

                await _context.DatosClima.AddAsync(datosClima);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(CrearDatosClima), new { id = datosClima.IdDatosClima }, datosClima);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"Error al obtener datos del clima: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("{idActividad}")]
        public async Task<ActionResult<DatosClima>> GetDatosClima(int idActividad)
        {
            var datosClima = await _context.DatosClima
                .FirstOrDefaultAsync(dc => dc.IdActividad == idActividad);

            if (datosClima == null)
            {
                return NotFound("Datos climáticos no encontrados para esta actividad.");
            }

            return Ok(datosClima);
        }
    }
}
