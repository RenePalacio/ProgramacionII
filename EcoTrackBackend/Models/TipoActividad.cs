using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class TipoActividad
    {
        [Key]
        public int IdTipoActividad { get; set; }
        [Required]
        public string NombreActividad { get; set; }
        public string DescripcionActividad {get; set;}

        public TipoActividad()
        {
            NombreActividad=string.Empty;
            DescripcionActividad=string.Empty;
        }
    }
}
