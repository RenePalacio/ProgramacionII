using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoTrack.Models
{
    public class DatosClima
    {
        [Key]
        public int IdDatosClima { get; set; }

        [Required]
        public int IdActividad { get; set; }

        [ForeignKey("IdActividad")]
        public Actividad? Actividad { get; set; }

        [Required]
        public float Temperatura { get; set; }

        [Required]
        public float RayosUV { get; set; }

        [Required]
        public float ProbabilidadLluvia { get; set; }

        [StringLength(50)]
        public string CalidadAire { get; set; } = string.Empty;

        [StringLength(50)]
        public string Polvo { get; set; } = string.Empty;
    }
}
