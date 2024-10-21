using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoTrack.Models
{
   public class Actividad
{
    public int IdActividad { get; set; }
    required public int IdUsuario { get; set; }
    required public int IdTipoActividad { get; set; }
    required public string Ubicacion { get; set; }
    public DateTime Fecha { get; set; }
    public TimeSpan Hora { get; set; }
    public int Duracion { get; set; }
    public string? Notas { get; set; }

    // Propiedades de navegación
    public virtual Usuario? Usuario { get; set; }
    public virtual TipoActividad? TipoActividad { get; set; }
    public virtual ICollection<DatosClima>? DatosClima { get; set; } // Asegúrate de que esta línea esté presente
}

}
