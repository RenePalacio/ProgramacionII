using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
            try
            {
                var actividades = await _context.Actividades
                    .Include(a => a.TipoActividad)
                    .Where(a => a.IdUsuario == idUsuario)
                    .Select(a => new 
                    {
                        a.IdActividad,
                        a.Hora,
                        a.Ubicacion,
                        a.Fecha,
                        a.Duracion,
                        a.Notas,
                        TipoActividad = a.TipoActividad != null ? a.TipoActividad.NombreActividad : "Desconocido"
                    })
                    .ToListAsync();

                if (!actividades.Any())
                {
                    return NotFound("No se encontraron actividades para este usuario.");
                }

                return Ok(actividades);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        [HttpGet("actividad/{idActividad}")]
        public async Task<IActionResult> GetActividadPorId(int idActividad)
        {
            try
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
                    TipoActividad = actividad.TipoActividad?.NombreActividad ?? "Desconocido",
                    actividad.Ubicacion,
                    actividad.Fecha,
                    actividad.Duracion,
                    actividad.Notas
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateActividad([FromBody] CreateActividadDto actividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
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
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        [HttpPut("actividad/{idActividad}")]
        public async Task<IActionResult> EditarActividad(int idActividad, [FromBody] CreateActividadDto actividadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var actividad = await _context.Actividades.FindAsync(idActividad);
                if (actividad == null)
                {
                    return NotFound("Actividad no encontrada.");
                }

                actividad.IdTipoActividad = actividadDto.IdTipoActividad;
                actividad.Ubicacion = actividadDto.Ubicacion;
                actividad.Fecha = actividadDto.Fecha;
                actividad.Duracion = actividadDto.Duracion;
                actividad.Hora = actividadDto.Hora;
                actividad.Notas = actividadDto.Notas;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }

        [HttpDelete("actividad/{idActividad}")]
public async Task<IActionResult> EliminarActividad(int idActividad)
{
    try
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        var actividad = await _context.Actividades.FindAsync(idActividad);
        if (actividad == null)
        {
            return NotFound("Actividad no encontrada.");
        }

        var datosClima = await _context.DatosClima.Where(dc => dc.IdActividad == idActividad).ToListAsync();
        _context.DatosClima.RemoveRange(datosClima);

        _context.Actividades.Remove(actividad);

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return NoContent();
    }
    catch (Exception ex)
    {
        return StatusCode(500, "Error interno del servidor: " + ex.Message);
    }
}

    }
}
