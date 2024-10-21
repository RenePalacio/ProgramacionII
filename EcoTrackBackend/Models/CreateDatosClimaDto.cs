using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateDatosClimaDto
    {
        [Required]
        public int IdActividad { get; set; }

        [Required]
        public float Temperatura { get; set; }

        [Required]
        public float RayosUV { get; set; }

        [Required]
        public float ProbabilidadLluvia { get; set; }

        [Required]
        [StringLength(50)]
        public string CalidadAire { get; set; } = string.Empty; // O usa required

        [Required]
        [StringLength(50)]
        public string Polvo { get; set; } = string.Empty; // O usa required
    }
}
