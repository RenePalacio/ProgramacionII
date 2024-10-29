using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoTrackBackend.Migrations
{
    /// <inheritdoc />
    public partial class DatosClima : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CalidadAire",
                table: "DatosClima");

            migrationBuilder.DropColumn(
                name: "Polvo",
                table: "DatosClima");

            migrationBuilder.RenameColumn(
                name: "RayosUV",
                table: "DatosClima",
                newName: "IndiceUV");

            migrationBuilder.RenameColumn(
                name: "ProbabilidadLluvia",
                table: "DatosClima",
                newName: "Humedad");

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "DatosClima",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "RecomendacionUV",
                table: "DatosClima",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "DatosClima");

            migrationBuilder.DropColumn(
                name: "RecomendacionUV",
                table: "DatosClima");

            migrationBuilder.RenameColumn(
                name: "IndiceUV",
                table: "DatosClima",
                newName: "RayosUV");

            migrationBuilder.RenameColumn(
                name: "Humedad",
                table: "DatosClima",
                newName: "ProbabilidadLluvia");

            migrationBuilder.AddColumn<string>(
                name: "CalidadAire",
                table: "DatosClima",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Polvo",
                table: "DatosClima",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
