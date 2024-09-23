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
    public class UsuarioController : ControllerBase
    {
        private readonly DbContext _context;

        public UsuarioController(DbContext context)
        {
            _context = context;
        }

        // GET: api/usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync(); // Devuelve la lista de usuarios
        }

        // GET: api/usuario/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id); // Busca el usuario por ID
            if (usuario == null)
            {
                return NotFound(); // Si no se encuentra, devuelve un error 404
            }

            return usuario; // Devuelve el usuario encontrado
        }

        // POST: api/usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid) // Verifica si el modelo es válido
            {
                return BadRequest(ModelState); // Devuelve un error 400 si no es válido
            }

            _context.Usuarios.Add(usuario); // Añade el usuario al contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario); // Devuelve la acción creada
        }

        // PUT: api/usuario/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, [FromBody] Usuario usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest(); // Devuelve un error 400 si los IDs no coinciden
            }

            _context.Entry(usuario).State = EntityState.Modified; // Marca el usuario como modificado
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }

        // DELETE: api/usuario/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id); // Busca el usuario por ID
            if (usuario == null)
            {
                return NotFound(); // Devuelve un error 404 si no se encuentra
            }

            _context.Usuarios.Remove(usuario); // Elimina el usuario del contexto
            await _context.SaveChangesAsync(); // Guarda los cambios

            return NoContent(); // Devuelve un código 204 sin contenido
        }
    }
}
