using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrumban.Migrations
{
    public partial class Scrumban : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Defects",
                columns: table => new
                {
                    DefectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Priority = table.Column<string>(nullable: true),
                    Severity = table.Column<string>(nullable: true),
                    StoryId = table.Column<int>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Defects", x => x.DefectId);
                });

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StoryStates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryStates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    RoleID = table.Column<int>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    PictureID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Stories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StoryStateId = table.Column<int>(nullable: false),
                    PriorityId = table.Column<int>(nullable: false),
                    ProgrammerId = table.Column<int>(nullable: true),
                    TaskId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stories_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stories_StoryStates_StoryStateId",
                        column: x => x.StoryStateId,
                        principalTable: "StoryStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Low" },
                    { 2, "Medium" },
                    { 3, "Heigh" },
                    { 4, "Immediate" }
                });

            migrationBuilder.InsertData(
                table: "States",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Ready To Start" },
                    { 2, "In Progress" },
                    { 3, "Development Complete" },
                    { 4, "Test Complete" },
                    { 5, "Accepted" }
                });

            migrationBuilder.InsertData(
                table: "StoryStates",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Non Started" },
                    { 2, "In Progress" },
                    { 3, "Rejected" },
                    { 4, "In Complete" },
                    { 5, "Done" },
                    { 6, "Accepted" }
                });

            migrationBuilder.InsertData(
                table: "Stories",
                columns: new[] { "Id", "Description", "Name", "PriorityId", "ProgrammerId", "StoryStateId", "TaskId" },
                values: new object[] { 1, "Description1", "Story1", 2, null, 1, 0 });

            migrationBuilder.InsertData(
                table: "Stories",
                columns: new[] { "Id", "Description", "Name", "PriorityId", "ProgrammerId", "StoryStateId", "TaskId" },
                values: new object[] { 2, "Description2", "Story2", 2, null, 1, 0 });

            migrationBuilder.InsertData(
                table: "Stories",
                columns: new[] { "Id", "Description", "Name", "PriorityId", "ProgrammerId", "StoryStateId", "TaskId" },
                values: new object[] { 3, "Description3", "Story3", 2, null, 1, 0 });

            migrationBuilder.CreateIndex(
                name: "IX_Stories_PriorityId",
                table: "Stories",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_StoryStateId",
                table: "Stories",
                column: "StoryStateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Defects");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "StoryStates");
        }
    }
}
