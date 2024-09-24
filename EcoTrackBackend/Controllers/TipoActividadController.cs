using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Models;
using EcoTrack; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoActividadController : ControllerBase
    {
        private readonly EcoTrackDbContext _context; // Cambiado a EcoTrackDbContext

        public TipoActividadController(EcoTrackDbContext context)
        {
            _context = context; // Asigna el contexto correcto
        }

        // GET: api/tipoactividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActividad>>> GetTipoActividades()
        {
            return await _context.TipoActividades.ToListAsync(); // Devuelve la lista de tipos de actividad
        }

        // GET: api/tipoactividad/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActividad>> GetTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); // Busca el tipo de actividad por ID
            if (tipoActividad == null)
            {
                return NotFound(); // Devuelve un error 404 si no se encuentra
            }

            return tipoActividad; // Devuelve el tipo de actividad encontrado
        }

        // POST: api/tipoactividad
        [HttpPost]
        public async Task<ActionResult<TipoActividad>> PostTipoActividad([FromBody] TipoActividad tipoActividad)
        {
            if (!ModelState.IsValid) // Verifica si el modelo es válido
            {
                return BadRequest(ModelState); // Devuelve un error 400 si no es válido
            }

            _context.TipoActividades.Add(tipoActividad); // Añade el tipo de actividad al contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return CreatedAtAction(nameof(GetTipoActividad), new { id = tipoActividad.IdTipoActividad }, tipoActividad); // Devuelve la acción creada
        }

        // PUT: api/tipoactividad/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoActividad(int id, [FromBody] TipoActividad tipoActividad)
        {
            if (id != tipoActividad.IdTipoActividad)
            {
                return BadRequest(); // Devuelve un error 400 si los IDs no coinciden
            }

            _context.Entry(tipoActividad).State = EntityState.Modified; // Marca el tipo de actividad como modificado
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }

        // DELETE: api/tipoactividad/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); // Busca el tipo de actividad por ID
            if (tipoActividad == null)
            {
                return NotFound(); // Devuelve un error 404 si no se encuentra
            }

            _context.TipoActividades.Remove(tipoActividad); // Elimina el tipo de actividad del contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }
    }
}
