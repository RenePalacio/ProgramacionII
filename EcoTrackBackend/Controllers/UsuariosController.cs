using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore; // Asegúrate de incluir esto

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly EcoTrackDbContext _context;

        public UsuarioController(EcoTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios() // Cambiado a Task
        {
            return await _context.Usuarios.ToListAsync(); // Usa ToListAsync
        }

        // GET: api/usuario/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id) // Cambiado a Task
        {
            var usuario = await _context.Usuarios.FindAsync(id); // Usa FindAsync
            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        // POST: api/usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(CreateUsuarioDto usuarioDto) // Cambiado a Task
        {
            var usuario = new Usuario
            {
                Nombre = usuarioDto.Nombre,
                Email = usuarioDto.Email,
                Password = usuarioDto.Password
            };
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync(); // Usa SaveChangesAsync

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
        }

        // PUT: api/usuario/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, CreateUsuarioDto usuarioDto) // Cambiado a Task
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            usuario.Nombre = usuarioDto.Nombre;
            usuario.Email = usuarioDto.Email;
            usuario.Password = usuarioDto.Password;

            await _context.SaveChangesAsync(); // Usa SaveChangesAsync
            return NoContent();
        }

        // DELETE: api/usuario/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id) // Cambiado a Task
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync(); // Usa SaveChangesAsync
            return NoContent();
        }
    }
}
