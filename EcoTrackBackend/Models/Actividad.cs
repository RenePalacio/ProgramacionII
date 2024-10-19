using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoTrack.Models
{
    public class Actividad
    {
        [Key]
        public int IdActividad { get; set; }

        [Required]
        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public required Usuario Usuario { get; set; }

        [Required]
        public int IdTipoActividad { get; set; }

        [ForeignKey("IdTipoActividad")]
        public required TipoActividad TipoActividad { get; set; }

        [Required]
        [StringLength(200)] // Limitar el tamaño de la ubicación
        public string Ubicacion { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public TimeSpan Duracion { get; set; }

        [Required]
        public DateTime Hora { get; set; } // Nueva propiedad

        // Relación uno a muchos con DatosClima
        public virtual required ICollection<DatosClima> DatosClima { get; set; } = new List<DatosClima>();
    }
}
