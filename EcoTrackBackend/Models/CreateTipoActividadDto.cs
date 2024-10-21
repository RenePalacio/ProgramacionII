using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateTipoActividadDto
    {
        [Required]
        [StringLength(50)]
        public string NombreActividad { get; set; } = string.Empty;

        [Required]
        public string DescripcionActividad { get; set; } = string.Empty;
    }
}
