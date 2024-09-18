namespace EcoTrack.Models
{
    public class Actividad
    {
        public int IdActividad { get; set; }
        public int IdUsuario { get; set; }
        public int IdTipoActividad { get; set; }
        public string? Ubicacion { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Duracion { get; set; }
        public string? Notas { get; set; }  // Ahora acepta valores NULL

        // Relación con Usuario, TipoActividad y DatosClima
        public Usuario? Usuario { get; set; }
        public TipoActividad? TipoActividad { get; set; }
        public DatosClima? Clima { get; set; }
    }
}
