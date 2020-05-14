using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrumban.Migrations
{
    public partial class MyFirstMigration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Story",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Sprint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Features",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Defects",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2020, 5, 14, 11, 36, 42, 556, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                column: "StartDate",
                value: new DateTime(2020, 5, 14, 11, 36, 42, 561, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2020, 5, 14, 11, 36, 42, 561, DateTimeKind.Local));

            migrationBuilder.CreateIndex(
                name: "IX_Story_UserId",
                table: "Story",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprint_TeamId",
                table: "Sprint",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_UserId",
                table: "Features",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_UserId",
                table: "Defects",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Defects_Users_UserId",
                table: "Defects",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Features_Users_UserId",
                table: "Features",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sprint_Teams_TeamId",
                table: "Sprint",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Story_Users_UserId",
                table: "Story",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Defects_Users_UserId",
                table: "Defects");

            migrationBuilder.DropForeignKey(
                name: "FK_Features_Users_UserId",
                table: "Features");

            migrationBuilder.DropForeignKey(
                name: "FK_Sprint_Teams_TeamId",
                table: "Sprint");

            migrationBuilder.DropForeignKey(
                name: "FK_Story_Users_UserId",
                table: "Story");

            migrationBuilder.DropIndex(
                name: "IX_Story_UserId",
                table: "Story");

            migrationBuilder.DropIndex(
                name: "IX_Sprint_TeamId",
                table: "Sprint");

            migrationBuilder.DropIndex(
                name: "IX_Features_UserId",
                table: "Features");

            migrationBuilder.DropIndex(
                name: "IX_Defects_UserId",
                table: "Defects");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Story");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Sprint");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Features");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Defects");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2020, 5, 13, 21, 21, 1, 737, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                column: "StartDate",
                value: new DateTime(2020, 5, 13, 21, 21, 1, 739, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2020, 5, 13, 21, 21, 1, 739, DateTimeKind.Local));
        }
    }
}
