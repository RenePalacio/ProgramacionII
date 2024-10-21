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
        private readonly EcoTrackDbContext _context; // Definición del contexto de la base de datos

        public TipoActividadController(EcoTrackDbContext context)
        {
            _context = context; // Inicialización del contexto
        }

        // GET: api/tipoactividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActividad>>> GetTipoActividades()
        {
            return await _context.TipoActividades.ToListAsync(); // Obtener todos los tipos de actividad
        }

        // GET: api/tipoactividad/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActividad>> GetTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); // Buscar tipo de actividad por ID
            if (tipoActividad == null)
            {
                return NotFound(); // Retornar 404 si no se encuentra
            }
            return Ok(tipoActividad); // Retornar 200 si se encuentra
        }

        // POST: api/tipoactividad
        [HttpPost]
        public async Task<ActionResult<TipoActividad>> PostTipoActividad(CreateTipoActividadDto tipoActividadDto)
        {
            var tipoActividad = new TipoActividad
            {
                NombreActividad = tipoActividadDto.NombreActividad,
                DescripcionActividad = tipoActividadDto.DescripcionActividad
            };
            
            _context.TipoActividades.Add(tipoActividad); // Añadir nuevo tipo de actividad
            await _context.SaveChangesAsync(); // Guardar cambios en la base de datos
            
            return CreatedAtAction(nameof(GetTipoActividad), new { id = tipoActividad.IdTipoActividad }, tipoActividad); // Retornar 201
        }

        // PUT: api/tipoactividad/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoActividad(int id, CreateTipoActividadDto tipoActividadDto)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); // Buscar tipo de actividad por ID
            if (tipoActividad == null)
            {
                return NotFound(); // Retornar 404 si no se encuentra
            }
            
            tipoActividad.NombreActividad = tipoActividadDto.NombreActividad; // Actualizar nombre
            tipoActividad.DescripcionActividad = tipoActividadDto.DescripcionActividad; // Actualizar descripción
            
            await _context.SaveChangesAsync(); // Guardar cambios
            return NoContent(); // Retornar 204
        }

        // DELETE: api/tipoactividad/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoActividad(int id)
        {
            var tipoActividad = await _context.TipoActividades.FindAsync(id); // Buscar tipo de actividad por ID
            if (tipoActividad == null)
            {
                return NotFound(); // Retornar 404 si no se encuentra
            }
            
            _context.TipoActividades.Remove(tipoActividad); // Eliminar tipo de actividad
            await _context.SaveChangesAsync(); // Guardar cambios
            return NoContent(); // Retornar 204
        }
    }
}
