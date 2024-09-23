using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
	public class NotificacionService : INotificacionService
	{
		private readonly EcoTrackDbContext _context;

		public NotificacionService(EcoTrackDbContext context)
		{
			_context = context;
		}

		public async Task<Notificacion> CrearNotificacion(Notificacion notificacion)
		{
			_context.Notificaciones.Add(notificacion);
			await _context.SaveChangesAsync();
			return notificacion;
		}

		public async Task<Notificacion> ObtenerNotificacionPorId(int id)
		{
			return await _context.Notificaciones.FindAsync(id);
		}

		public async Task<IEnumerable<Notificacion>> ObtenerTodasNotificaciones()
		{
			return await _context.Notificaciones.ToListAsync();
		}
	}
}
