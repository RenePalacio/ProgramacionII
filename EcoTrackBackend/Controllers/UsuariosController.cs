using Microsoft.AspNetCore.Mvc;
using EcoTrack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

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
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/usuario/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        // POST: api/usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(CreateUsuarioDto usuarioDto)
        {
            var usuario = new Usuario
            {
                Nombre = usuarioDto.Nombre,
                Email = usuarioDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(usuarioDto.Password) // Hashear la contraseña
            };
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
        }

        // POST: api/usuario/login
        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> LoginUsuario([FromBody] LoginUsuarioDto loginDto)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, usuario.Password))
            {
                return Unauthorized();
            }

            return Ok(new { idUsuario = usuario.IdUsuario });
        }

        // POST: api/usuario/check-email
        [HttpPost("check-email")]
        public async Task<ActionResult<bool>> CheckEmail([FromBody] EmailCheckDto emailCheckDto)
        {
            var exists = await _context.Usuarios.AnyAsync(u => u.Email == emailCheckDto.Email);
            return Ok(new { exists });
        }

        // PUT: api/usuario/{id}
        [HttpPut("{id}")]
            public async Task<IActionResult> PutUsuario(int id, UpdateUsuarioDto usuarioDto)
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return NotFound();
                }

                // Actualizar solo los campos de nombre y email
                usuario.Nombre = usuarioDto.Nombre;
                usuario.Email = usuarioDto.Email;

                await _context.SaveChangesAsync();
                return NoContent();
            }

        

        // DELETE: api/usuario/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
