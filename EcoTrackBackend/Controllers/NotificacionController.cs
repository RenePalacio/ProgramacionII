using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models;
using EcoTrack.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacionController : ControllerBase
    {
        private readonly INotificacionService _notificacionService;

        public NotificacionController(INotificacionService notificacionService)
        {
            _notificacionService = notificacionService;
        }

        // POST: api/notificaciones
        [HttpPost]
        public async Task<IActionResult> CrearNotificacion([FromBody] Notificacion notificacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var nuevaNotificacion = await _notificacionService.CrearNotificacion(notificacion);
            return CreatedAtAction(nameof(GetNotificacion), new { id = nuevaNotificacion.IdNotificacion }, nuevaNotificacion);
        }

        // GET: api/notificaciones/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotificacion(int id)
        {
            var notificacion = await _notificacionService.ObtenerNotificacionPorId(id);
            if (notificacion == null)
            {
                return NotFound();
            }

            return Ok(notificacion);
        }

        // GET: api/notificaciones
        [HttpGet]
        public async Task<IActionResult> GetTodasNotificaciones()
        {
            var notificaciones = await _notificacionService.ObtenerTodasNotificaciones();
            return Ok(notificaciones);
        }
    }
}
