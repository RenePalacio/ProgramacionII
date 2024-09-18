using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoTrack.Models
{
    public class Notificacion
    {
        [Key]
        public int IdNotificacion { get; set; }

        [Required]
        public int IdActividad { get; set; }
        [ForeignKey("IdActividad")]
        public required Actividad Actividad { get; set; }

        [Required]
        public required string Mensaje { get; set; }

        [Required]
        public DateTime FechaEnvio { get; set; }

        [Required]
        public bool Enviado { get; set; }
    }
}
