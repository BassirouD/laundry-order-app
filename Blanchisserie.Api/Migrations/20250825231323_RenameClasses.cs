using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blanchisserie.Api.Migrations
{
    /// <inheritdoc />
    public partial class RenameClasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Prenom",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Statut",
                table: "Commandes",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Motif",
                table: "Commandes",
                newName: "Reason");

            migrationBuilder.RenameColumn(
                name: "Commentaire",
                table: "Commandes",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "Articles",
                table: "Commandes",
                newName: "Items");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "Prenom");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "Nom");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Commandes",
                newName: "Statut");

            migrationBuilder.RenameColumn(
                name: "Reason",
                table: "Commandes",
                newName: "Motif");

            migrationBuilder.RenameColumn(
                name: "Items",
                table: "Commandes",
                newName: "Articles");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Commandes",
                newName: "Commentaire");
        }
    }
}
