using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoTrackBackend.Migrations
{
    /// <inheritdoc />
    public partial class SegundaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdDatosClima",
                table: "DatosClima",
                newName: "idDatosClima");

            migrationBuilder.RenameColumn(
                name: "IdDatosClima",
                table: "Actividades",
                newName: "idDatosClima");

            migrationBuilder.AlterColumn<int>(
                name: "idDatosClima",
                table: "Actividades",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "idDatosClima",
                table: "DatosClima",
                newName: "IdDatosClima");

            migrationBuilder.RenameColumn(
                name: "idDatosClima",
                table: "Actividades",
                newName: "IdDatosClima");

            migrationBuilder.AlterColumn<int>(
                name: "IdDatosClima",
                table: "Actividades",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
