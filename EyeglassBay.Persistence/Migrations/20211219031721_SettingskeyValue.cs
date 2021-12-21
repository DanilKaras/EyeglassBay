using Microsoft.EntityFrameworkCore.Migrations;

namespace EyeglassBay.Persistence.Migrations
{
    public partial class SettingskeyValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CalculationCoefficient",
                table: "Settings");

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "Settings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "Settings",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "Settings");

            migrationBuilder.AddColumn<decimal>(
                name: "CalculationCoefficient",
                table: "Settings",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
