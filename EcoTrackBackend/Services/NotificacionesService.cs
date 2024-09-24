using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
    public class NotificacionService : INotificacionService
    {
        private readonly EcoTrackDbContext _dbContext;

        public NotificacionService(EcoTrackDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Notificacion> CrearNotificacion(Notificacion notificacion)
        {
            _dbContext.Notificaciones.Add(notificacion);
            await _dbContext.SaveChangesAsync();
            return notificacion;
        }

        public async Task<Notificacion?> ObtenerNotificacionPorId(int id)
        {
            return await _dbContext.Notificaciones
                .Include(n => n.Actividad) // Asegúrate de que 'Actividad' esté en el modelo
                .FirstOrDefaultAsync(n => n.IdNotificacion == id);
        }

        public async Task<IEnumerable<Notificacion>> ObtenerTodasNotificaciones()
        {
            return await _dbContext.Notificaciones
                .Include(n => n.Actividad) // Asegúrate de que 'Actividad' esté en el modelo
                .ToListAsync();
        }
    }
}
