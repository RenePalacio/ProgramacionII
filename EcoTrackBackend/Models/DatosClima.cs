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
        public float Humedad { get; set; }

        [Required]
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        public float IndiceUV { get; set; }

        [Required]
        public string RecomendacionUV { get; set; } = string.Empty;
    }
}
