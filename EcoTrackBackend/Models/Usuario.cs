using System.ComponentModel.DataAnnotations;

namespace EcoTrack.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
// Inicializa con un valor no nulo
        public Usuario()
        {
             Nombre = string.Empty; 
            Email = string.Empty;  
            Password = string.Empty; 

        }
    }
}
