namespace EcoTrack.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        // Relación con Actividades y Notificaciones
        public List<Actividad>? Actividades { get; set; }
        public List<Notificacion>? Notificaciones { get; set; }
    }
}
