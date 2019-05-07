using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNet.OData.Extensions;
using Scrumban.BusinessLogicLayer;
using Scrumban.DataAccessLayer;
using Scrumban.DataAccessLayer.Interfaces;
using Scrumban.DataAccessLayer.Repositories;
using Scrumban.ServiceLayer.Interfaces;
using Scrumban.ServiceLayer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Scrumban.Hubs;

namespace Scrumban
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
      
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ScrumbanContext>(options => options.UseSqlServer(connection));
            services.AddOptions();

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //{
            //        options.RequireHttpsMetadata = false;
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = true,
            //            ValidIssuer = Configuration.GetSection("JwtAuthentication:Issuer").Value,

            //            ValidateAudience = true,
            //            ValidAudience = Configuration.GetSection("JwtAuthentication:Audience").Value,

            //            ValidateLifetime = true,
            //            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),

            //            ValidateIssuerSigningKey = true
            //        };
            //    }
            //);
            services.Configure<JWTAuthentication>(Configuration.GetSection("JwtAuthentication"));
            services.AddSingleton<IPostConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer();
            
            services.AddTransient<IJiraService, JiraService>();
            services.AddTransient<IDefectService, DefectService>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IDefectRepository, DefectRepository>();
            services.AddTransient<ISprintRepository, SprintRepository>();
            services.AddTransient<ISprintService, SprintService>();
            services.AddTransient<ISprintStatusRepository, SprintStatusRepository>();
            services.AddTransient<IStoryRepository, StoryRepository>();
            services.AddTransient<IStoryService, StoryService>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<ITeamService, TeamService>();

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            
            services.AddODataQueryFilter();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


            services.AddOptions();
            services.AddSignalR();
            services.AddODataQueryFilter();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddOData();
        }

       
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseMvc(routeBuilder =>
            {
                routeBuilder.Filter().OrderBy().Count().Expand().Select();
            });
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
                routes.EnableDependencyInjection();
                routes.Expand().Select().Count().OrderBy().Filter().MaxTop(null);  //MaxTop(null) for top oData
                
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chatHub");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
           
            app.UseWebSockets();
            

            
        }

        private class ConfigureJwtBearerOptions : IPostConfigureOptions<JwtBearerOptions>
        {
            private readonly IOptions<JWTAuthentication> _jwtAuthentication;

            public ConfigureJwtBearerOptions(IOptions<JWTAuthentication> jwtAuthentication)
            {
                _jwtAuthentication = jwtAuthentication ?? throw new System.ArgumentNullException(nameof(jwtAuthentication));
            }

            public void PostConfigure(string name, JwtBearerOptions options)
            {
                var jwtAuthentication = _jwtAuthentication.Value;

                options.ClaimsIssuer = jwtAuthentication.Issuer;
                options.IncludeErrorDetails = true;
                options.RequireHttpsMetadata = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    //ValidateActor = true,
                    ValidateIssuer = true,
                    ValidIssuer = jwtAuthentication.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtAuthentication.Audience,

                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtAuthentication.SymmetricSecurityKey,

                    NameClaimType = ClaimTypes.NameIdentifier
                };
            }
        }
    }
}
