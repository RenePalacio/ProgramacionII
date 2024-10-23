using System;
using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateActividadDto
    {
        [Required]
        public int IdTipoActividad { get; set; }

        [Required]
       // [StringLength(200)]
        public required string Ubicacion { get; set; }

        [Required]
        [DataType(DataType.Date)]  // Para asegurar que solo se envíe la fecha
        public DateTime Fecha { get; set; }

        [Required]
        public int Duracion { get; set; }

        [Required]
        public TimeSpan Hora { get; set; }

        [Required]
        public int IdUsuario { get; set; }

        public string? Notas { get; set; }
    }
}
