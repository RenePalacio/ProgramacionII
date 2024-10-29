using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Models;
using Microsoft.AspNetCore.SignalR; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class NotificacionController : ControllerBase
{
    private readonly EcoTrackDbContext _context;

    public NotificacionController(EcoTrackDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Notificacion>> CrearNotificacion(CreateNotificacionDto dto)
    {
        var notificacion = new Notificacion
        {
            IdActividad = dto.IdActividad,
            Mensaje = dto.Mensaje,
            FechaEnvio = dto.FechaEnvio,
            Enviado = false
        };

        _context.Notificaciones.Add(notificacion);
        await _context.SaveChangesAsync(); 

        return CreatedAtAction(nameof(CrearNotificacion), new { id = notificacion.IdNotificacion }, notificacion);
    }

   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Notificacion>>> GetNotificaciones()
    {
        return await _context.Notificaciones.ToListAsync();
    }

    [HttpPut("{id}")]
public async Task<IActionResult> ActualizarNotificacion(int id, UpdateNotificacionDto dto)
{
    var notificacion = await _context.Notificaciones.FindAsync(id);
    if (notificacion == null)
    {
        return NotFound();
    }

    // Actualiza los campos de la notificación
    notificacion.Mensaje = dto.Mensaje;
    notificacion.FechaEnvio = dto.FechaEnvio;

    await _context.SaveChangesAsync();
    return NoContent();
}

}

}
