using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using EcoTrack.Models;
using EcoTrack;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly EcoTrackDbContext _context;

    public UsuariosController(EcoTrackDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsuarios()
    {
        var usuarios = await _context.Usuarios.ToListAsync();
        if (usuarios == null || !usuarios.Any())
        {
            return NotFound("No se encontraron usuarios.");
        }
        return Ok(usuarios);
    }
}
