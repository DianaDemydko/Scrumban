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

            services.AddTransient<IDefectService, DefectService>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IDefectRepository, DefectRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<ITaskService, TaskService>();

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


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
                routes.Expand().Select().Count().OrderBy().Filter(); 
                
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
            
            //app.UseSignalR(routes =>
            //{
            //     routes.MapHub<PollHub>("/pollHub");
            //});

            
        }
    }
}
