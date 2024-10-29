using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateDatosClimaDto
    {
        [Required]
        public int IdActividad { get; set; }

        [Required]
        [Range(-90, 90, ErrorMessage = "La latitud debe estar entre -90 y 90.")]
        public double Latitude { get; set; }

        [Required]
        [Range(-180, 180, ErrorMessage = "La longitud debe estar entre -180 y 180.")]
        public double Longitude { get; set; }
    }
}
