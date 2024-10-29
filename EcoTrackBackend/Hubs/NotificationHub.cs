using Microsoft.AspNetCore.SignalR;

namespace EcoTrackBackend.Hubs
{
    public class NotificacionHub : Hub
    {
        public async Task EnviarNotificacion(string mensaje, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("RecibirNotificacion", mensaje);
        }
    }
}
