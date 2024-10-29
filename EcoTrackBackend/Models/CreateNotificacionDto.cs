using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateNotificacionDto
    {

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

    public class UpdateNotificacionDto
{
    public required string Mensaje { get; set; }
    public DateTime FechaEnvio { get; set; }
}

}
