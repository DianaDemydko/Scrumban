using System;
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
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
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
                    StoryState_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryStates", x => x.StoryState_id);
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
                name: "TokenRefresh",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    Token = table.Column<string>(nullable: true),
                    IssuedTime = table.Column<DateTime>(nullable: false),
                    ExpiresTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TokenRefresh", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    PriorityID = table.Column<int>(nullable: true),
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
                        name: "FK_Features_Priorities_PriorityID",
                        column: x => x.PriorityID,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Features_States_StateID",
                        column: x => x.StateID,
                        principalTable: "States",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Image = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pictures_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Story",
                columns: table => new
                {
                    Story_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StoryState_id = table.Column<int>(nullable: false),
                    sprint_id = table.Column<int>(nullable: false),
                    StoryPoints = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Rank = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    FeatureId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Story", x => x.Story_id);
                    table.ForeignKey(
                        name: "FK_Story_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "Features",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Story_StoryStates_StoryState_id",
                        column: x => x.StoryState_id,
                        principalTable: "StoryStates",
                        principalColumn: "StoryState_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    FinishDate = table.Column<DateTime>(nullable: true),
                    TaskStateId = table.Column<int>(nullable: false),
                    PriorityId = table.Column<int>(nullable: false),
                    StoryId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
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
                        name: "FK_Tasks_Story_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Story",
                        principalColumn: "Story_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tasks_TaskStates_TaskStateId",
                        column: x => x.TaskStateId,
                        principalTable: "TaskStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskChangeHistories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Operation = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false),
                    TaskId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskChangeHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskChangeHistories_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskChangeHistories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Defects",
                columns: new[] { "DefectId", "Description", "Name", "Priority", "Severity", "State", "Status", "StoryId" },
                values: new object[,]
                {
                    { 1, "Descriprion_1", "Defect_1", "Medium", "Medium", "To Do", "Open", 1 },
                    { 20, "Descriprion_2", "Defect_30", "Low", "Low", "Done", "Close", 1 },
                    { 19, "Descriprion_5", "Defect_17", "Low", "Medium", "To Do", "Open", 1 },
                    { 18, "Descriprion_2", "Defect_14", "Medium", "Low", "Done", "Close", 1 },
                    { 17, "Descriprion_8", "Defect_11", "Low", "Medium", "In progress", "Open", 1 },
                    { 16, "Descriprion_1", "Defect_20", "Medium", "Low", "Done", "Close", 1 },
                    { 15, "Descriprion_2", "Defect_18", "Low", "Medium", "In progress", "Open", 1 },
                    { 14, "Descriprion_8", "Defect_12", "High", "Low", "Done", "Close", 1 },
                    { 13, "Descriprion_1", "Defect_10", "Medium", "Low", "To Do", "Open", 1 },
                    { 12, "Descriprion_2", "Defect_9", "Low", "Medium", "Done", "Close", 1 },
                    { 11, "Descriprion_5", "Defect_3", "Medium", "Medium", "In progress", "Open", 1 },
                    { 10, "Descriprion_3", "Defect_5", "Medium", "Medium", "Done", "Close", 1 },
                    { 9, "Descriprion_2", "Style", "High", "Critical", "To Do", "Open", 1 },
                    { 8, "Descriprion_1", "ConnectToDatabase", "High", "Critical", "Done", "Close", 1 },
                    { 7, "Descriprion_9", "BusinessLogic", "High", "Medium", "In progress", "Open", 1 },
                    { 6, "Descriprion_7", "KanbanBoard", "High", "Critical", "Done", "Close", 1 },
                    { 5, "Descriprion_5", "Pagination", "High", "Critical", "Done", "Close", 1 },
                    { 4, "Descriprion_3", "Autorization", "High", "Critical", "Done", "Close", 1 },
                    { 3, "Descriprion_3", "Menu", "High", "Medium", "Done", "Close", 1 },
                    { 2, "Descriprion_2", "Some Defect", "High", "Critical", "Done", "Close", 1 },
                    { 21, "Descriprion_1", "Defect_12", "Medium", "Medium", "In progress", "Open", 1 }
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "Heigh" },
                    { 4, "Immediate" },
                    { 1, "Low" },
                    { 2, "Medium" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Team Member" },
                    { 2, "Scrum Master" },
                    { 3, "Product Owner" },
                    { 4, "Tester" },
                    { 5, "Admin" }
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
                    { 4, "Test Complete" },
                    { 3, "Development Complete" },
                    { 1, "Ready To Start" },
                    { 2, "In Progress" }
                });

            migrationBuilder.InsertData(
                table: "StoryStates",
                columns: new[] { "StoryState_id", "Name" },
                values: new object[,]
                {
                    { 1, "Not Selected" },
                    { 2, "Selected" },
                    { 3, "In Progress" },
                    { 4, "Testing" },
                    { 5, "Done" },
                    { 6, "Rejected" }
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
                    { 2, "Description", new DateTime(2019, 6, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "SPRINT 2", 2, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 1, "Description", new DateTime(2019, 5, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "SPRINT 1", 3, new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Story",
                columns: new[] { "Story_id", "Description", "EndDate", "FeatureId", "Name", "Rank", "StartDate", "StoryPoints", "StoryState_id", "sprint_id" },
                values: new object[,]
                {
                    { 3, "The shortest description", new DateTime(2019, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Fix very bad bug", 4, new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, 5, 1 },
                    { 9, "Short desc.", null, null, "Something important to do", 2, null, 12, 1, 1 },
                    { 10, "Medium size description, sample text and something else...", null, null, "Add Something important 1", 3, null, 4, 1, 1 },
                    { 11, "Long loong longLong longng lng log longLong longLg longg longLog longLg ng long description", null, null, "Add Something important 2", 15, null, 50, 1, 1 },
                    { 1, "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description", new DateTime(2019, 5, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Add something usefull", 12, new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 40, 1, 1 },
                    { 2, "Long longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong longLong long description", new DateTime(2019, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Add something usefull", 12, new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 5, 1 },
                    { 4, "Description3", new DateTime(2019, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Test something", 40, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 20, 5, 2 },
                    { 5, "Description4", new DateTime(2019, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Create chart", 40, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 30, 5, 2 },
                    { 6, "Description4", new DateTime(2019, 6, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Create chat", 40, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 15, 5, 2 },
                    { 7, "Description4", new DateTime(2019, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Create team entity", 40, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, 5, 2 },
                    { 8, "Description4", new DateTime(2019, 6, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Create team controller", 40, new DateTime(2019, 5, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 5, 2 }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Description", "FinishDate", "Name", "PriorityId", "StartDate", "StoryId", "TaskStateId", "UserId" },
                values: new object[,]
                {
                    { 1, null, null, "Task1", 1, new DateTime(2019, 5, 2, 16, 2, 18, 726, DateTimeKind.Local), null, 1, null },
                    { 3, null, null, "Task3", 1, new DateTime(2019, 5, 2, 16, 2, 18, 740, DateTimeKind.Local), null, 1, null },
                    { 2, null, null, "Task2", 1, new DateTime(2019, 5, 2, 16, 2, 18, 740, DateTimeKind.Local), null, 1, null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "Password", "RoleId", "Surname" },
                values: new object[] { 1, "admin@gmail.com", "Name", "43192475F95E3820FE441DAAFF7C84D9B73CA3A5AFC7309AE03F783151B6B0976E4D68CD990F97AD0D65CA640D35A407199D6D7510F1DFF5477B8CFCE1531475", 5, "Surname" });

            migrationBuilder.InsertData(
                table: "Pictures",
                columns: new[] { "Id", "Image", "UserId" },
                values: new object[] { 1, "", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Features_OwnerID",
                table: "Features",
                column: "OwnerID");

            migrationBuilder.CreateIndex(
                name: "IX_Features_PriorityID",
                table: "Features",
                column: "PriorityID");

            migrationBuilder.CreateIndex(
                name: "IX_Features_StateID",
                table: "Features",
                column: "StateID");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_UserId",
                table: "Pictures",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sprint_SprintStatus_id",
                table: "Sprint",
                column: "SprintStatus_id");

            migrationBuilder.CreateIndex(
                name: "IX_Story_FeatureId",
                table: "Story",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_Story_StoryState_id",
                table: "Story",
                column: "StoryState_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskChangeHistories_TaskId",
                table: "TaskChangeHistories",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskChangeHistories_UserId",
                table: "TaskChangeHistories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_StoryId",
                table: "Tasks",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TaskStateId",
                table: "Tasks",
                column: "TaskStateId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UserId",
                table: "Tasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Defects");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "Sprint");

            migrationBuilder.DropTable(
                name: "TaskChangeHistories");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "TokenRefresh");

            migrationBuilder.DropTable(
                name: "SprintStatus");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Story");

            migrationBuilder.DropTable(
                name: "TaskStates");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "StoryStates");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "OwnerDAL");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "States");
        }
    }
}
