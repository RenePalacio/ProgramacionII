namespace EcoTrack.Models
{
    public class Notificacion
    {
        public int IdNotificacion { get; set; }
        public int IdUsuario { get; set; }
        public int IdActividad { get; set; }
        public string? Mensaje { get; set; }
        public DateTime FechaEnvio { get; set; }
        public bool Enviado { get; set; }

        // Relación con Usuario y Actividad
        public Usuario? Usuario { get; set; }
        public Actividad? Actividad { get; set; }
    }
}
