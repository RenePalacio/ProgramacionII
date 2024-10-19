using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoTrackBackend.Migrations
{
    /// <inheritdoc />
    public partial class MigracionPrueba10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DatosClima_IdActividad",
                table: "DatosClima");

            migrationBuilder.DropColumn(
                name: "idDatosClima",
                table: "Actividades");

            migrationBuilder.RenameColumn(
                name: "idDatosClima",
                table: "DatosClima",
                newName: "IdDatosClima");

            migrationBuilder.AlterColumn<string>(
                name: "Ubicacion",
                table: "Actividades",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "Hora",
                table: "Actividades",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_DatosClima_IdActividad",
                table: "DatosClima",
                column: "IdActividad");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DatosClima_IdActividad",
                table: "DatosClima");

            migrationBuilder.DropColumn(
                name: "Hora",
                table: "Actividades");

            migrationBuilder.RenameColumn(
                name: "IdDatosClima",
                table: "DatosClima",
                newName: "idDatosClima");

            migrationBuilder.AlterColumn<string>(
                name: "Ubicacion",
                table: "Actividades",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<int>(
                name: "idDatosClima",
                table: "Actividades",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DatosClima_IdActividad",
                table: "DatosClima",
                column: "IdActividad",
                unique: true);
        }
    }
}
