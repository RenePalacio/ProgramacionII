[Route("api/[controller]")]
[ApiController]
public class ActividadesController : ControllerBase
{
    private readonly DbContext _context;

    // Constructor: permite acceder a la base de datos a través de _context
    public ActividadesController(DbContext context)
    {
        _context = context;
    }

    // GET: api/actividades
    // Devuelve una lista con todas las actividades
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Actividad>>> GetActividades()
    {
        // Incluye datos de Usuario y TipoActividad relacionados
        return await _context.Actividades.Include(a => a.Usuario).Include(a => a.TipoActividad).ToListAsync();
    }

    // GET: api/actividades/5
    // Devuelve una actividad específica por su ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Actividad>> GetActividad(int id)
    {
        var actividad = await _context.Actividades.FindAsync(id); // Busca la actividad con el ID proporcionado
        if (actividad == null)
        {
            return NotFound(); // Si no se encuentra, devuelve un error 404
        }

        return actividad; // Si se encuentra, devuelve la actividad
    }

    // POST: api/actividades
    // Agrega una nueva actividad a la base de datos
    [HttpPost]
    public async Task<ActionResult<Actividad>> PostActividad(Actividad actividad)
    {
        _context.Actividades.Add(actividad); // Añade la actividad al contexto
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        // Devuelve la actividad creada con un enlace al nuevo recurso
        return CreatedAtAction(nameof(GetActividad), new { id = actividad.IdActividad }, actividad);
    }

    // PUT: api/actividades/5
    // Actualiza una actividad existente con el ID proporcionado
    [HttpPut("{id}")]
    public async Task<IActionResult> PutActividad(int id, Actividad actividad)
    {
        if (id != actividad.IdActividad)
        {
            return BadRequest(); // Si el ID en la URL no coincide con el de la actividad, devuelve un error 400
        }

        _context.Entry(actividad).State = EntityState.Modified; // Marca la actividad como modificada
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        return NoContent(); // Devuelve un código 204 sin contenido
    }

    // DELETE: api/actividades/5
    // Elimina una actividad de la base de datos
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActividad(int id)
    {
        var actividad = await _context.Actividades.FindAsync(id); // Busca la actividad con el ID proporcionado
        if (actividad == null)
        {
            return NotFound(); // Si no se encuentra, devuelve un error 404
        }

        _context.Actividades.Remove(actividad); // Elimina la actividad del contexto
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

        return NoContent(); // Devuelve un código 204 sin contenido
    }
}
