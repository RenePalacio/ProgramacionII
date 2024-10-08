﻿// <auto-generated />
using System;
using EcoTrack;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EcoTrackBackend.Migrations
{
    [DbContext(typeof(EcoTrackDbContext))]
    partial class EcoTrackDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EcoTrack.Models.Actividad", b =>
                {
                    b.Property<int>("IdActividad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdActividad"));

                    b.Property<TimeSpan>("Duracion")
                        .HasColumnType("time");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdTipoActividad")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Ubicacion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("idDatosClima")
                        .HasColumnType("int");

                    b.HasKey("IdActividad");

                    b.HasIndex("IdTipoActividad");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Actividades");
                });

            modelBuilder.Entity("EcoTrack.Models.DatosClima", b =>
                {
                    b.Property<int>("idDatosClima")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idDatosClima"));

                    b.Property<string>("CalidadAire")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdActividad")
                        .HasColumnType("int");

                    b.Property<string>("Polvo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("ProbabilidadLluvia")
                        .HasColumnType("real");

                    b.Property<float>("RayosUV")
                        .HasColumnType("real");

                    b.Property<float>("Temperatura")
                        .HasColumnType("real");

                    b.HasKey("idDatosClima");

                    b.HasIndex("IdActividad")
                        .IsUnique();

                    b.ToTable("DatosClima");
                });

            modelBuilder.Entity("EcoTrack.Models.Notificacion", b =>
                {
                    b.Property<int>("IdNotificacion")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdNotificacion"));

                    b.Property<bool>("Enviado")
                        .HasColumnType("bit");

                    b.Property<DateTime>("FechaEnvio")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdActividad")
                        .HasColumnType("int");

                    b.Property<string>("Mensaje")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdNotificacion");

                    b.HasIndex("IdActividad");

                    b.ToTable("Notificaciones");
                });

            modelBuilder.Entity("EcoTrack.Models.TipoActividad", b =>
                {
                    b.Property<int>("IdTipoActividad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTipoActividad"));

                    b.Property<string>("DescripcionActividad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombreActividad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdTipoActividad");

                    b.ToTable("TipoActividades");
                });

            modelBuilder.Entity("EcoTrack.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUsuario");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("EcoTrack.Models.Actividad", b =>
                {
                    b.HasOne("EcoTrack.Models.TipoActividad", "TipoActividad")
                        .WithMany()
                        .HasForeignKey("IdTipoActividad")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("EcoTrack.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("TipoActividad");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("EcoTrack.Models.DatosClima", b =>
                {
                    b.HasOne("EcoTrack.Models.Actividad", "Actividad")
                        .WithOne("Clima")
                        .HasForeignKey("EcoTrack.Models.DatosClima", "IdActividad")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Actividad");
                });

            modelBuilder.Entity("EcoTrack.Models.Notificacion", b =>
                {
                    b.HasOne("EcoTrack.Models.Actividad", "Actividad")
                        .WithMany()
                        .HasForeignKey("IdActividad")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Actividad");
                });

            modelBuilder.Entity("EcoTrack.Models.Actividad", b =>
                {
                    b.Navigation("Clima");
                });
#pragma warning restore 612, 618
        }
    }
}
