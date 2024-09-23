using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Models;
using EcoTrack.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ActividadController : ControllerBase
	{
		private readonly DbContext _context;

		public ActividadController(DbContext context)
		{
			_context = context;
		}

		// GET: api/actividad
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Actividad>>> GetActividades()
		{
			return await _context.Actividades
				.Include(a => a.Usuario)
				.Include(a => a.TipoActividad)
				.ToListAsync(); // Devuelve la lista de actividades con datos relacionados
		}

		// GET: api/actividad/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<Actividad>> GetActividad(int id)
		{
			var actividad = await _context.Actividades
				.Include(a => a.Usuario)
				.Include(a => a.TipoActividad)
				.FirstOrDefaultAsync(a => a.IdActividad == id); // Busca la actividad por ID

			if (actividad == null)
			{
				return NotFound(); // Devuelve un error 404 si no se encuentra
			}

			return actividad; // Devuelve la actividad encontrada
		}

		// POST: api/actividad
		[HttpPost]
		public async Task<ActionResult<Actividad>> PostActividad([FromBody] Actividad actividad)
		{
			if (!ModelState.IsValid) // Verifica si el modelo es válido
			{
				return BadRequest(ModelState); // Devuelve un error 400 si no es válido
			}

			_context.Actividades.Add(actividad); // Añade la actividad al contexto
			await _context.SaveChangesAsync(); // Guarda los cambios

			return CreatedAtAction(nameof(GetActividad), new { id = actividad.IdActividad }, actividad); // Devuelve la acción creada
		}

		// PUT: api/actividad/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> PutActividad(int id, [FromBody] Actividad actividad)
		{
			if (id != actividad.IdActividad)
			{
				return BadRequest(); // Devuelve un error 400 si los IDs no coinciden
			}

			_context.Entry(actividad).State = EntityState.Modified; // Marca la actividad como modificada
			await _context.SaveChangesAsync(); // Guarda los cambios

			return NoContent(); // Devuelve un código 204 sin contenido
		}

		// DELETE: api/actividad/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteActividad(int id)
		{
			var actividad = await _context.Actividades.FindAsync(id); // Busca la actividad por ID
			if (actividad == null)
			{
				return NotFound(); // Devuelve un error 404 si no se encuentra
			}

			_context.Actividades.Remove(actividad); // Elimina la actividad del contexto
			await _context.SaveChangesAsync(); // Guarda los cambios

			return NoContent(); // Devuelve un código 204 sin contenido
		}
	}
}
