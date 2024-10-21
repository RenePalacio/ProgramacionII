using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Necesario para ToListAsync y otros métodos asincrónicos
using EcoTrack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificacionController : ControllerBase
    {
        private readonly EcoTrackDbContext _context;

        public NotificacionController(EcoTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/notificacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notificacion>>> GetNotificaciones()
        {
            return Ok(await _context.Notificaciones.ToListAsync());
        }

        // GET: api/notificacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Notificacion>> GetNotificacion(int id)
        {
            var notificacion = await _context.Notificaciones.FindAsync(id);
            if (notificacion == null)
            {
                return NotFound();
            }
            return Ok(notificacion);
        }

        // POST: api/notificacion
        [HttpPost]
        public async Task<ActionResult<Notificacion>> PostNotificacion(CreateNotificacionDto notificacionDto)
        {
            var notificacion = new Notificacion
            {
                IdActividad = notificacionDto.IdActividad,
                IdUsuario = notificacionDto.IdUsuario,
                Mensaje = notificacionDto.Mensaje,
                FechaEnvio = notificacionDto.FechaEnvio,
                Enviado = notificacionDto.Enviado
            };

            await _context.Notificaciones.AddAsync(notificacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotificacion), new { id = notificacion.IdNotificacion }, notificacion);
        }

        // PUT: api/notificacion/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotificacion(int id, CreateNotificacionDto notificacionDto)
        {
            var notificacion = await _context.Notificaciones.FindAsync(id);
            if (notificacion == null)
            {
                return NotFound();
            }

            notificacion.IdActividad = notificacionDto.IdActividad;
            notificacion.IdUsuario = notificacionDto.IdUsuario;
            notificacion.Mensaje = notificacionDto.Mensaje;
            notificacion.FechaEnvio = notificacionDto.FechaEnvio;
            notificacion.Enviado = notificacionDto.Enviado;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/notificacion/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotificacion(int id)
        {
            var notificacion = await _context.Notificaciones.FindAsync(id);
            if (notificacion == null)
            {
                return NotFound();
            }

            _context.Notificaciones.Remove(notificacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
