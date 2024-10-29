using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Models;
using EcoTrack;

public class NotificacionService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public NotificacionService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceProvider.CreateScope()) // Crear un alcance
            {
                var context = scope.ServiceProvider.GetRequiredService<EcoTrackDbContext>();
                var ahora = DateTime.UtcNow;
                var notificaciones = await context.Notificaciones
                    .Where(n => n.FechaEnvio <= ahora && !n.Enviado)
                    .ToListAsync();

                foreach (var notificacion in notificaciones)
                {
                    Console.WriteLine($"Notificación: {notificacion.Mensaje}"); // Para probar
                    notificacion.Enviado = true; // Marca la notificación como enviada
                }

                await context.SaveChangesAsync();
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Revisa cada minuto
        }
    }
}


