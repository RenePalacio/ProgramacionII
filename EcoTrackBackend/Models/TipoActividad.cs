using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class TipoActividad
    {
        [Key]
        public int IdTipoActividad { get; set; }

        [Required]
        [StringLength(50)]
        required public string NombreActividad { get; set; } = string.Empty;

        [StringLength(int.MaxValue)]
        public string? DescripcionActividad { get; set; } // Opcional
    }
}
