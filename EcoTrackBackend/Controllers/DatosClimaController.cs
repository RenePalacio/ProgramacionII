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
    public class DatosClimaController : ControllerBase
    {
        private readonly DbContext _context;

        public DatosClimaController(DbContext context)
        {
            _context = context;
        }

        // GET: api/datosclima
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatosClima>>> GetDatosClima()
        {
            return await _context.DatosClima.ToListAsync(); // Devuelve la lista de datos climáticos
        }

        // GET: api/datosclima/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DatosClima>> GetDatosClima(int id)
        {
            var datosClima = await _context.DatosClima.FindAsync(id); // Busca los datos climáticos por ID
            if (datosClima == null)
            {
                return NotFound(); // Devuelve un error 404 si no se encuentra
            }

            return datosClima; // Devuelve los datos climáticos encontrados
        }

        // POST: api/datosclima
        [HttpPost]
        public async Task<ActionResult<DatosClima>> PostDatosClima([FromBody] DatosClima datosClima)
        {
            if (!ModelState.IsValid) // Verifica si el modelo es válido
            {
                return BadRequest(ModelState); // Devuelve un error 400 si no es válido
            }

            _context.DatosClima.Add(datosClima); // Añade los datos climáticos al contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return CreatedAtAction(nameof(GetDatosClima), new { id = datosClima.IdDatosClima }, datosClima); // Devuelve la acción creada
        }

        // PUT: api/datosclima/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatosClima(int id, [FromBody] DatosClima datosClima)
        {
            if (id != datosClima.IdDatosClima)
            {
                return BadRequest(); // Devuelve un error 400 si los IDs no coinciden
            }

            _context.Entry(datosClima).State = EntityState.Modified; // Marca los datos climáticos como modificados
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }

        // DELETE: api/datosclima/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDatosClima(int id)
        {
            var datosClima = await _context.DatosClima.FindAsync(id); // Busca los datos climáticos por ID
            if (datosClima == null)
            {
                return NotFound(); // Devuelve un error 404 si no se encuentra
            }

            _context.DatosClima.Remove(datosClima); // Elimina los datos climáticos del contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }
    }
}
