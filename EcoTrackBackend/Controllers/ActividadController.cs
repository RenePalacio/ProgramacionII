using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActividadController : ControllerBase
    {
        private readonly EcoTrackDbContext _context;

        public ActividadController(EcoTrackDbContext context)
        {
            _context = context;
        }

        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> GetActividadesPorUsuario(int idUsuario)
        {
            var actividades = await _context.Actividades
                .Include(a => a.TipoActividad)
                .Where(a => a.IdUsuario == idUsuario)
                .Select(a => new 
                {
                    a.IdActividad,
                    a.Hora,
                    TipoActividad = a.TipoActividad.NombreActividad
                })
                .ToListAsync();

            if (!actividades.Any())
            {
                return NotFound("No se encontraron actividades para este usuario.");
            }

            return Ok(actividades);
        }

        [HttpGet("actividad/{idActividad}")]
        public async Task<IActionResult> GetActividadPorId(int idActividad)
        {
            var actividad = await _context.Actividades
                .Include(a => a.TipoActividad)
                .FirstOrDefaultAsync(a => a.IdActividad == idActividad);

            if (actividad == null)
            {
                return NotFound("Actividad no encontrada.");
            }

            return Ok(new 
            {
                actividad.IdActividad,
                actividad.Hora,
                TipoActividad = actividad.TipoActividad.NombreActividad,
                actividad.Ubicacion,
                actividad.Fecha,
                actividad.Duracion,
                actividad.Notas
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActividad([FromBody] CreateActividadDto actividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actividad = new Actividad
            {
                IdUsuario = actividadDto.IdUsuario,
                IdTipoActividad = actividadDto.IdTipoActividad,
                Ubicacion = actividadDto.Ubicacion,
                Fecha = actividadDto.Fecha,
                Duracion = actividadDto.Duracion,
                Hora = actividadDto.Hora,
                Notas = actividadDto.Notas
            };

            _context.Actividades.Add(actividad);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetActividadesPorUsuario), new { idUsuario = actividadDto.IdUsuario }, actividad);
        }

        [HttpPut("actividad/{idActividad}")]
        public async Task<IActionResult> EditarActividad(int idActividad, [FromBody] CreateActividadDto actividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actividad = await _context.Actividades.FindAsync(idActividad);
            if (actividad == null)
            {
                return NotFound("Actividad no encontrada.");
            }

            // Actualiza los valores
            actividad.IdTipoActividad = actividadDto.IdTipoActividad;
            actividad.Ubicacion = actividadDto.Ubicacion;
            actividad.Fecha = actividadDto.Fecha;
            actividad.Duracion = actividadDto.Duracion;
            actividad.Hora = actividadDto.Hora;
            actividad.Notas = actividadDto.Notas;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("actividad/{idActividad}")]
        public async Task<IActionResult> EliminarActividad(int idActividad)
        {
            var actividad = await _context.Actividades.FindAsync(idActividad);
            if (actividad == null)
            {
                return NotFound("Actividad no encontrada.");
            }

            _context.Actividades.Remove(actividad);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
