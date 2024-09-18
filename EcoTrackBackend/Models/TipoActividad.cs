namespace EcoTrack.Models
{
    public class TipoActividad
    {
        public int IdTipoActividad { get; set; }
        public string? NombreActividad { get; set; }
        public string? DescripcionActividad { get; set; } // Ahora acepta valores NULL

        // Relación con Actividades
        public List<Actividad>? Actividades { get; set; }
    }
}
