using EcoTrack.Models;
using EcoTrack.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosClimaController : ControllerBase
    {
        private readonly DatosClimaService _datosClimaService;

        public DatosClimaController(DatosClimaService datosClimaService)
        {
            _datosClimaService = datosClimaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatosClima>>> GetDatosClima()
        {
            var datosClima = await _datosClimaService.ObtenerTodosLosDatosClima();
            return Ok(datosClima);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DatosClima>> GetDatosClima(int id)
        {
            var datosClima = await _datosClimaService.ObtenerDatosClimaPorId(id);
            if (datosClima == null)
            {
                return NotFound();
            }

            return Ok(datosClima);
        }

        [HttpPost]
        public async Task<ActionResult<DatosClima>> PostDatosClima(int idActividad)
        {
            var datosClima = await _datosClimaService.ObtenerDatosClimaDesdeApis(idActividad);
            return CreatedAtAction(nameof(GetDatosClima), new { id = datosClima.IdDatosClima }, datosClima);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatosClima(int id, [FromBody] DatosClima datosClima)
        {
            if (id != datosClima.IdDatosClima)
            {
                return BadRequest();
            }

            await _datosClimaService.ActualizarDatosClima(datosClima);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDatosClima(int id)
        {
            var datosClima = await _datosClimaService.ObtenerDatosClimaPorId(id);
            if (datosClima == null)
            {
                return NotFound();
            }

            await _datosClimaService.EliminarDatosClima(id);
            return NoContent();
        }
    }
}
