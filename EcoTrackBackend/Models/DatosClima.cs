using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoTrack.Models
{
    public class DatosClima
    {
        [Key]
        public int IdDatosClima { get; set; }

        public int IdActividad { get; set; } // Llave foránea

        public float Temperatura { get; set; }
        public float RayosUV { get; set; }
        public float ProbabilidadLluvia { get; set; }

        // Hacer estas propiedades requeridas
        [Required]
        public string CalidadAire { get; set; } = string.Empty; // Asignar un valor por defecto
        [Required]
        public string Polvo { get; set; } = string.Empty; // Asignar un valor por defecto

        // Propiedad de navegación hacia Actividad
        public required virtual Actividad Actividad { get; set; }
    }
}
