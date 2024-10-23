using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Models; // Asegúrate de que el espacio de nombres sea correcto
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoActividadController : ControllerBase
    {
        private readonly EcoTrackDbContext _context;

        public TipoActividadController(EcoTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/tipoactividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActividad>>> GetTipoActividades()
        {
            try
            {
                var tipoActividades = await _context.TipoActividades.ToListAsync();
                return Ok(tipoActividades);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        // GET: api/tipoactividad/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActividad>> GetTipoActividad(int id)
        {
            try
            {
                var tipoActividad = await _context.TipoActividades.FindAsync(id);
                if (tipoActividad == null)
                {
                    return NotFound($"Tipo de actividad con ID {id} no encontrado.");
                }
                return Ok(tipoActividad);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        // POST: api/tipoactividad
        [HttpPost]
        public async Task<ActionResult<TipoActividad>> PostTipoActividad(CreateTipoActividadDto tipoActividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tipoActividad = new TipoActividad
                {
                    NombreActividad = tipoActividadDto.NombreActividad,
                    DescripcionActividad = tipoActividadDto.DescripcionActividad
                };

                _context.TipoActividades.Add(tipoActividad);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTipoActividad), new { id = tipoActividad.IdTipoActividad }, tipoActividad);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        // PUT: api/tipoactividad/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoActividad(int id, CreateTipoActividadDto tipoActividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tipoActividad = await _context.TipoActividades.FindAsync(id);
                if (tipoActividad == null)
                {
                    return NotFound($"Tipo de actividad con ID {id} no encontrado.");
                }

                tipoActividad.NombreActividad = tipoActividadDto.NombreActividad;
                tipoActividad.DescripcionActividad = tipoActividadDto.DescripcionActividad;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        // DELETE: api/tipoactividad/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoActividad(int id)
        {
            try
            {
                var tipoActividad = await _context.TipoActividades.FindAsync(id);
                if (tipoActividad == null)
                {
                    return NotFound($"Tipo de actividad con ID {id} no encontrado.");
                }

                _context.TipoActividades.Remove(tipoActividad);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }
    }
}
