using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Esta línea es necesaria
using EcoTrack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosClimaController : ControllerBase
    {
        private readonly EcoTrackDbContext _context;

        public DatosClimaController(EcoTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/datosclima
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatosClima>>> GetDatosClima()
        {
            return Ok(await _context.DatosClima.ToListAsync());
        }

        // GET: api/datosclima/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DatosClima>> GetDatosClima(int id)
        {
            var datosClima = await _context.DatosClima.FindAsync(id);
            if (datosClima == null)
            {
                return NotFound();
            }
            return Ok(datosClima);
        }

        // POST: api/datosclima
        [HttpPost]
        public async Task<ActionResult<DatosClima>> PostDatosClima(CreateDatosClimaDto datosClimaDto)
        {
            var datosClima = new DatosClima
            {
                IdActividad = datosClimaDto.IdActividad,
                Temperatura = datosClimaDto.Temperatura,
                RayosUV = datosClimaDto.RayosUV,
                ProbabilidadLluvia = datosClimaDto.ProbabilidadLluvia,
                CalidadAire = datosClimaDto.CalidadAire,
                Polvo = datosClimaDto.Polvo
            };
            await _context.DatosClima.AddAsync(datosClima);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDatosClima), new { id = datosClima.IdDatosClima }, datosClima);
        }

        // PUT: api/datosclima/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatosClima(int id, CreateDatosClimaDto datosClimaDto)
        {
            var datosClima = await _context.DatosClima.FindAsync(id);
            if (datosClima == null)
            {
                return NotFound();
            }
            datosClima.Temperatura = datosClimaDto.Temperatura;
            datosClima.RayosUV = datosClimaDto.RayosUV;
            datosClima.ProbabilidadLluvia = datosClimaDto.ProbabilidadLluvia;
            datosClima.CalidadAire = datosClimaDto.CalidadAire;
            datosClima.Polvo = datosClimaDto.Polvo;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/datosclima/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDatosClima(int id)
        {
            var datosClima = await _context.DatosClima.FindAsync(id);
            if (datosClima == null)
            {
                return NotFound();
            }
            _context.DatosClima.Remove(datosClima);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
