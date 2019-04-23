using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrumban.Migrations
{
    public partial class FirstMigration : Migration
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
                name: "OwnerDAL",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerDAL", x => x.ID);
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
                name: "SprintStatus",
                columns: table => new
                {
                    SprintStatus_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StatusName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SprintStatus", x => x.SprintStatus_id);
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
                name: "TaskStates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskStates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Project = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamID);
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
                name: "Sprint",
                columns: table => new
                {
                    Sprint_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    SprintStatus_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprint", x => x.Sprint_id);
                    table.ForeignKey(
                        name: "FK_Sprint_SprintStatus_SprintStatus_id",
                        column: x => x.SprintStatus_id,
                        principalTable: "SprintStatus",
                        principalColumn: "SprintStatus_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StateID = table.Column<int>(nullable: true),
                    OwnerID = table.Column<int>(nullable: true),
                    ReleaseID = table.Column<int>(nullable: true),
                    Priority = table.Column<int>(nullable: true),
                    Time = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Features_OwnerDAL_OwnerID",
                        column: x => x.OwnerID,
                        principalTable: "OwnerDAL",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Features_States_StateID",
                        column: x => x.StateID,
                        principalTable: "States",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    FinishDate = table.Column<DateTime>(nullable: true),
                    TaskStateId = table.Column<int>(nullable: false),
                    PriorityId = table.Column<int>(nullable: false),
                    ProgrammerId = table.Column<int>(nullable: true),
                    StoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_TaskStates_TaskStateId",
                        column: x => x.TaskStateId,
                        principalTable: "TaskStates",
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
                table: "SprintStatus",
                columns: new[] { "SprintStatus_id", "StatusName" },
                values: new object[,]
                {
                    { 1, "Not Started" },
                    { 2, "Started" },
                    { 3, "Completed" },
                    { 4, "Canceled" }
                });

            migrationBuilder.InsertData(
                table: "States",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 5, "Accepted" },
                    { 3, "Development Complete" },
                    { 4, "Test Complete" },
                    { 1, "Ready To Start" },
                    { 2, "In Progress" }
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
                table: "TaskStates",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "To Do" },
                    { 2, "In Progress" },
                    { 3, "Completed" }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "TeamID", "Name", "Project" },
                values: new object[,]
                {
                    { 1, "Lv-396.1 .Net", "Scrumban" },
                    { 2, "New Team", "New Project" }
                });

            migrationBuilder.InsertData(
                table: "Sprint",
                columns: new[] { "Sprint_id", "Description", "EndDate", "Name", "SprintStatus_id", "StartDate" },
                values: new object[,]
                {
                    { 1, "HUGE desc ======== ============== ========= ===============", new DateTime(2019, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "AAaSprint", 1, new DateTime(2019, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "empty", new DateTime(2019, 9, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "bbbb Sprint", 1, new DateTime(2019, 8, 9, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "-", new DateTime(2019, 10, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "anonimous", 1, new DateTime(2019, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "desc", new DateTime(2019, 12, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "nameless", 1, new DateTime(2019, 8, 17, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "666 Don't delete this 666", new DateTime(2018, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Evil Sprint 666", 1, new DateTime(2018, 3, 13, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, "some desc", new DateTime(2018, 5, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "XXXX", 1, new DateTime(2018, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Stories",
                columns: new[] { "Id", "Description", "Name", "PriorityId", "ProgrammerId", "StoryStateId", "TaskId" },
                values: new object[,]
                {
                    { 1, "Description1", "Story1", 2, null, 1, 0 },
                    { 2, "Description2", "Story2", 2, null, 1, 0 },
                    { 3, "Description3", "Story3", 2, null, 1, 0 }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Description", "FinishDate", "Name", "PriorityId", "ProgrammerId", "StartDate", "StoryId", "TaskStateId" },
                values: new object[,]
                {
                    { 1, null, null, "Task1", 1, null, null, null, 1 },
                    { 2, null, null, "Task2", 1, null, null, null, 1 },
                    { 3, null, null, "Task3", 1, null, null, null, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Features_OwnerID",
                table: "Features",
                column: "OwnerID");

            migrationBuilder.CreateIndex(
                name: "IX_Features_StateID",
                table: "Features",
                column: "StateID");

            migrationBuilder.CreateIndex(
                name: "IX_Sprint_SprintStatus_id",
                table: "Sprint",
                column: "SprintStatus_id");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_PriorityId",
                table: "Stories",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_StoryStateId",
                table: "Stories",
                column: "StoryStateId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TaskStateId",
                table: "Tasks",
                column: "TaskStateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Defects");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Sprint");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "OwnerDAL");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "SprintStatus");

            migrationBuilder.DropTable(
                name: "StoryStates");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "TaskStates");
        }
    }
}
