using EcoTrack.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
    public interface INotificacionService
    {
        Task<Notificacion> CrearNotificacion(Notificacion notificacion);
        Task<Notificacion?> ObtenerNotificacionPorId(int id);
        Task<IEnumerable<Notificacion>> ObtenerTodasNotificaciones();
    }
}
