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
        public required Actividad Actividad { get; set; }

        [Required]
        public float Temperatura { get; set; }

        [Required]
        public float RayosUV { get; set; }

        [Required]
        public float ProbabilidadLluvia { get; set; }

        [Required]
        public string CalidadAire { get; set; }

        [Required]
        public string Polvo { get; set; }

        public DatosClima()
        {
            CalidadAire=string.Empty;
            Polvo=string.Empty;
        }
    }
}
