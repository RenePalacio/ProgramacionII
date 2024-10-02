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
        private readonly EcoTrackDbContext _context;

        public TipoActividadController(EcoTrackDbContext context)
        {
            _context = context; 
        }

        // GET: api/tipoactividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActividad>>> GetTipoActividades()
        {
            return await _context.TipoActividades.ToListAsync(); 
        }

        // GET: api/tipoactividad/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActividad>> GetTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); 
            if (tipoActividad == null)
            {
                return NotFound(); 
            }

            return tipoActividad; 
        }

        // POST: api/tipoactividad
        [HttpPost]
        public async Task<ActionResult<TipoActividad>> PostTipoActividad([FromBody] TipoActividad tipoActividad)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState); 
            }

            _context.TipoActividades.Add(tipoActividad); 
            await _context.SaveChangesAsync(); 

            return CreatedAtAction(nameof(GetTipoActividad), new { id = tipoActividad.IdTipoActividad }, tipoActividad); // Devuelve la acción creada
        }

        // PUT: api/tipoactividad/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoActividad(int id, [FromBody] TipoActividad tipoActividad)
        {
            if (id != tipoActividad.IdTipoActividad)
            {
                return BadRequest();
            }

            _context.Entry(tipoActividad).State = EntityState.Modified; 
            await _context.SaveChangesAsync(); 

            return NoContent();
        }

        // DELETE: api/tipoactividad/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); 
            if (tipoActividad == null)
            {
                return NotFound(); 
            }

            _context.TipoActividades.Remove(tipoActividad); 
            await _context.SaveChangesAsync(); 

            return NoContent(); 
        }
    }
}
