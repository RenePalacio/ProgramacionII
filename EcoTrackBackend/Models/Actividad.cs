public class Actividad
{
    [Key]
    public int IdActividad { get; set; }

    public int IdUsuario { get; set; }
    [ForeignKey("IdUsuario")]
    public required Usuario Usuario { get; set; }

    [Required]
    public int IdTipoActividad { get; set; }
    [ForeignKey("IdTipoActividad")]
    public required TipoActividad TipoActividad { get; set; }

    [Required]
    public required string Ubicacion { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    public TimeSpan Duracion { get; set; }
    
    [Required]
    public DateTime Hora { get; set; } // Nueva propiedad

    // Relación uno a muchos con DatosClima
    public virtual required ICollection<DatosClima> DatosClima { get; set; }
}
