using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
    public class ActividadService
    {
        private readonly EcoTrackDbContext _dbContext;

        public ActividadService(EcoTrackDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Obtener todas las actividades
        public async Task<List<Actividad>> ObtenerTodasLasActividades()
        {
            return await _dbContext.Actividades
                .Include(a => a.Usuario)
                .Include(a => a.TipoActividad)
                .ToListAsync();
        }

        // Obtener actividad por ID
        public async Task<Actividad?> ObtenerActividadPorId(int id)
        {
            return await _dbContext.Actividades
                .Include(a => a.Usuario)
                .Include(a => a.TipoActividad)
                .FirstOrDefaultAsync(a => a.IdActividad == id);
        }

        // Crear nueva actividad
        public async Task<Actividad> CrearActividad(Actividad actividad)
        {
            if (actividad.Fecha < DateTime.Now)
            {
                throw new ArgumentException("La fecha de la actividad no puede ser en el pasado.");
            }

            _dbContext.Actividades.Add(actividad);
            await _dbContext.SaveChangesAsync();
            return actividad;
        }

        // Actualizar actividad
        public async Task<Actividad> ActualizarActividad(Actividad actividad)
        {
            var actividadExistente = await ObtenerActividadPorId(actividad.IdActividad);
            if (actividadExistente == null)
            {
                throw new KeyNotFoundException("Actividad no encontrada.");
            }

            _dbContext.Entry(actividad).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return actividad;
        }

        // Eliminar actividad
        public async Task EliminarActividad(int id)
        {
            var actividad = await ObtenerActividadPorId(id);
            if (actividad == null)
            {
                throw new KeyNotFoundException("Actividad no encontrada.");
            }

            _dbContext.Actividades.Remove(actividad);
            await _dbContext.SaveChangesAsync();
            
        }
    }
}
