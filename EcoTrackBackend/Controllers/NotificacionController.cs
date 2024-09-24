using EcoTrack.Models;
using EcoTrack.Services;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notificacion>>> GetNotificaciones()
        {
            var notificaciones = await _notificacionService.ObtenerTodasNotificaciones();
            return Ok(notificaciones);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Notificacion>> GetNotificacion(int id)
        {
            var notificacion = await _notificacionService.ObtenerNotificacionPorId(id);
            if (notificacion == null)
            {
                return NotFound();
            }

            return Ok(notificacion);
        }

        [HttpPost]
        public async Task<ActionResult<Notificacion>> PostNotificacion(Notificacion notificacion)
        {
            var createdNotificacion = await _notificacionService.CrearNotificacion(notificacion);
            return CreatedAtAction(nameof(GetNotificacion), new { id = createdNotificacion.IdNotificacion }, createdNotificacion);
        }
    }
}
