using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoTrackBackend.Migrations
{
    /// <inheritdoc />
    public partial class NombreDeTuMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TipoActividades",
                columns: table => new
                {
                    IdTipoActividad = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreActividad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescripcionActividad = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoActividades", x => x.IdTipoActividad);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                });

            migrationBuilder.CreateTable(
                name: "Actividades",
                columns: table => new
                {
                    IdActividad = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    IdTipoActividad = table.Column<int>(type: "int", nullable: false),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duracion = table.Column<TimeSpan>(type: "time", nullable: false),
                    IdDatosClima = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actividades", x => x.IdActividad);
                    table.ForeignKey(
                        name: "FK_Actividades_TipoActividades_IdTipoActividad",
                        column: x => x.IdTipoActividad,
                        principalTable: "TipoActividades",
                        principalColumn: "IdTipoActividad",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Actividades_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DatosClima",
                columns: table => new
                {
                    IdDatosClima = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdActividad = table.Column<int>(type: "int", nullable: false),
                    Temperatura = table.Column<float>(type: "real", nullable: false),
                    RayosUV = table.Column<float>(type: "real", nullable: false),
                    ProbabilidadLluvia = table.Column<float>(type: "real", nullable: false),
                    CalidadAire = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Polvo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatosClima", x => x.IdDatosClima);
                    table.ForeignKey(
                        name: "FK_DatosClima_Actividades_IdActividad",
                        column: x => x.IdActividad,
                        principalTable: "Actividades",
                        principalColumn: "IdActividad",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notificaciones",
                columns: table => new
                {
                    IdNotificacion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdActividad = table.Column<int>(type: "int", nullable: false),
                    Mensaje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaEnvio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Enviado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notificaciones", x => x.IdNotificacion);
                    table.ForeignKey(
                        name: "FK_Notificaciones_Actividades_IdActividad",
                        column: x => x.IdActividad,
                        principalTable: "Actividades",
                        principalColumn: "IdActividad",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Actividades_IdTipoActividad",
                table: "Actividades",
                column: "IdTipoActividad");

            migrationBuilder.CreateIndex(
                name: "IX_Actividades_IdUsuario",
                table: "Actividades",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_DatosClima_IdActividad",
                table: "DatosClima",
                column: "IdActividad",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notificaciones_IdActividad",
                table: "Notificaciones",
                column: "IdActividad");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DatosClima");

            migrationBuilder.DropTable(
                name: "Notificaciones");

            migrationBuilder.DropTable(
                name: "Actividades");

            migrationBuilder.DropTable(
                name: "TipoActividades");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
