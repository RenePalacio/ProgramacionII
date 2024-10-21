using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateNotificacionDto
    {
        [Required]
        public int IdUsuario { get; set; }

        [Required]
        public int IdActividad { get; set; }

        [Required]
        [StringLength(255)]
        public string Mensaje { get; set; } = string.Empty;

        [Required]
        public DateTime FechaEnvio { get; set; }

        [Required]
        public bool Enviado { get; set; }
    }
}
