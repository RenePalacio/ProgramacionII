using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class CreateUsuarioDto
    {
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    }
   

    public class LoginUsuarioDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class EmailCheckDto
    {
        public required string Email { get; set; }
    }

    public class UpdateUsuarioDto
{
    public required string Nombre { get; set; }
    public required string Email { get; set; }
}



}
