namespace EcoTrack.Models
{
    public class DatosClima
    {
        public int IdDatosClima { get; set; }
        public int IdActividad { get; set; }
        public float Temperatura { get; set; }
        public float RayosUV { get; set; }
        public float ProbabilidadLluvia { get; set; }
        public string? CalidadAire { get; set; }
        public string? Polvo { get; set; }

        // Relación con Actividad
        public Actividad? Actividad { get; set; }
    }
}
