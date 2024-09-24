using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
    public class DatosClimaService
    {
        private readonly EcoTrackDbContext _dbContext;
        private readonly HttpClient _httpClient;

        public DatosClimaService(EcoTrackDbContext dbContext, HttpClient httpClient)
        {
            _dbContext = dbContext;
            _httpClient = httpClient;
        }

        public async Task<DatosClima> ObtenerDatosClimaDesdeApis(int idActividad)
        {
            var actividad = await _dbContext.Actividades.FindAsync(idActividad);
            if (actividad == null)
            {
                throw new Exception("La actividad no existe.");
            }

            var datosClima = new DatosClima
            {
                IdActividad = idActividad,
                Actividad = actividad
            };

            // Obtener datos de la API de temperatura
            var tempResponse = await _httpClient.GetAsync($"https://api.temperatura.com/{idActividad}");
            if (tempResponse.IsSuccessStatusCode)
            {
                var tempData = await tempResponse.Content.ReadFromJsonAsync<float?>();
                datosClima.Temperatura = tempData ?? 0; // Si es null, asignar un valor por defecto
            }

            // Obtener datos de la API de rayos UV
            var uvResponse = await _httpClient.GetAsync($"https://api.rayosuv.com/{idActividad}");
            if (uvResponse.IsSuccessStatusCode)
            {
                var uvData = await uvResponse.Content.ReadFromJsonAsync<float?>();
                datosClima.RayosUV = uvData ?? 0; // Si es null, asignar un valor por defecto
            }

            // Obtener datos de la API de calidad de aire
            var aireResponse = await _httpClient.GetAsync($"https://api.calidadaire.com/{idActividad}");
            if (aireResponse.IsSuccessStatusCode)
            {
                var aireData = await aireResponse.Content.ReadFromJsonAsync<string>();
                datosClima.CalidadAire = aireData ?? "Sin datos"; // Si es null, asignar un texto por defecto
            }

            // Obtener datos de la API de polvo
            var polvoResponse = await _httpClient.GetAsync($"https://api.polvo.com/{idActividad}");
            if (polvoResponse.IsSuccessStatusCode)
            {
                var polvoData = await polvoResponse.Content.ReadFromJsonAsync<string>();
                datosClima.Polvo = polvoData ?? "Sin datos"; // Si es null, asignar un texto por defecto
            }

            // Guardar en la base de datos
            _dbContext.DatosClima.Add(datosClima);
            await _dbContext.SaveChangesAsync();

            return datosClima;
        }

        public async Task<List<DatosClima>> ObtenerTodosLosDatosClima()
        {
            return await _dbContext.DatosClima.ToListAsync();
        }

        public async Task<DatosClima?> ObtenerDatosClimaPorId(int id)
        {
            return await _dbContext.DatosClima.FindAsync(id);
        }

        public async Task ActualizarDatosClima(DatosClima datosClima)
        {
            _dbContext.Entry(datosClima).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task EliminarDatosClima(int id)
        {
            var datosClima = await _dbContext.DatosClima.FindAsync(id);
            if (datosClima != null)
            {
                _dbContext.DatosClima.Remove(datosClima);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
