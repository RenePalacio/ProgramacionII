using System;
using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class Notificacion
    {
        [Key]
        
        public int IdNotificacion { get; set; }

        [Required]
        public int IdActividad { get; set; }

        [StringLength(255)]
        public string Mensaje { get; set; } = string.Empty;

        [Required]
        public DateTime FechaEnvio { get; set; }

        [Required]
        public bool Enviado { get; set; }
    }
}
