using Microsoft.EntityFrameworkCore;
using EcoTrack.Models;

namespace EcoTrack
{
    public class EcoTrackDbContext : DbContext
    {
        public EcoTrackDbContext(DbContextOptions<EcoTrackDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<TipoActividad> TipoActividades { get; set; }
        public DbSet<Actividad> Actividades { get; set; }
        public DbSet<DatosClima> DatosClima { get; set; }
        public DbSet<Notificacion> Notificaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de relaciones

            modelBuilder.Entity<DatosClima>()
                .HasOne(d => d.Actividad)
                .WithOne(a => a.Clima)
                .HasForeignKey<DatosClima>(d => d.IdActividad)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Actividad>()
                .HasOne(a => a.Usuario)
                .WithMany()
                .HasForeignKey(a => a.IdUsuario)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actividad>()
                .HasOne(a => a.TipoActividad)
                .WithMany()
                .HasForeignKey(a => a.IdTipoActividad)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
