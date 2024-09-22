[Route("api/[controller]")]
[ApiController]
using Microsoft.EntityFrameworkCore;
public class UsuariosController : ControllerBase
{
    private readonly DbContext _context;

    // Constructor: permite acceder a la base de datos a través de _context
    public UsuariosController(DbContext context)
    {
        _context = context;
    }

    // GET: api/usuarios
    // Devuelve una lista con todos los usuarios
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
    {
        return await _context.Usuarios.ToListAsync(); // Obtiene todos los usuarios de la base de datos
    }

    // GET: api/usuarios/5
    // Devuelve un usuario específico por su ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Usuario>> GetUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id); // Busca el usuario con el ID proporcionado

        if (usuario == null)
        {
            return NotFound(); // Si no se encuentra, devuelve un error 404
        }

        return usuario; // Si se encuentra, devuelve el usuario
    }

    // POST: api/usuarios
    // Agrega un nuevo usuario a la base de datos
    [HttpPost]
    public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
    {
        _context.Usuarios.Add(usuario); // Añade el usuario al contexto
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        // Devuelve el usuario creado con un enlace al nuevo recurso
        return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
    }

    // PUT: api/usuarios/5
    // Actualiza un usuario existente con el ID proporcionado
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
    {
        if (id != usuario.IdUsuario)
        {
            return BadRequest(); // Si el ID en la URL no coincide con el del usuario, devuelve un error 400
        }

        _context.Entry(usuario).State = EntityState.Modified; // Marca el usuario como modificado
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        return NoContent(); // Devuelve un código 204 sin contenido
    }

    // DELETE: api/usuarios/5
    // Elimina un usuario de la base de datos
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id); // Busca el usuario con el ID proporcionado
        if (usuario == null)
        {
            return NotFound(); // Si no se encuentra, devuelve un error 404
        }

        _context.Usuarios.Remove(usuario); // Elimina el usuario del contexto
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        return NoContent(); // Devuelve un código 204 sin contenido
    }
}
