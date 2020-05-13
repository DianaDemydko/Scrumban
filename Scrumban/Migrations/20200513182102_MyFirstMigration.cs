using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrumban.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Story_StoryId",
                table: "Tasks");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Users",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Story_StoryId",
                table: "Tasks",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Story_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Story_StoryId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TeamId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "Tester" });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2019, 5, 2, 16, 2, 18, 726, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                column: "StartDate",
                value: new DateTime(2019, 5, 2, 16, 2, 18, 740, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2019, 5, 2, 16, 2, 18, 740, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Story_StoryId",
                table: "Tasks",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Story_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
