using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MoviesGallery.Database;
using MoviesGallery.Models.Interfaces.Repository;
using MoviesGallery.Repository;
using System;
using System.IO;
using System.Linq;

namespace MoviesGallery.Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            var environment = Environment.GetEnvironmentVariable("Env") ?? "local";

            Console.WriteLine($"Environment: {environment}");

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                .AddUserSecrets<Startup>()
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string dbConnectionString = Configuration["Database:ConnectionString"];

            DbContextOptionsBuilder<MoviesDbContext> contextBuilder = new DbContextOptionsBuilder<MoviesDbContext>();
            DataSeeder.SeedData(new MoviesDbContext(contextBuilder
                .UseSqlServer(dbConnectionString).Options));
            
            contextBuilder.UseSqlServer(dbConnectionString);

            services.AddDbContext<MoviesDbContext>(options => options.UseSqlServer(dbConnectionString), 
                ServiceLifetime.Transient);

            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.ReportApiVersions = true;
                config.AssumeDefaultVersionWhenUnspecified = true;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("1.0", new OpenApiInfo { Title = "MoviesGallery.Backend v1.0", Version = "1.0" });
                c.SwaggerDoc("2.0", new OpenApiInfo { Title = "MoviesGallery.Backend v2.0", Version = "2.0" }); 
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });

            services.AddScoped<IMoviesRepository, MoviesRepository>();

            services.AddHealthChecks();

            services.AddHealthChecks().AddDbContextCheck<MoviesDbContext>();
            
            services.AddControllers();

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options => {
                    options.SwaggerEndpoint("/swagger/1.0/swagger.json", "MoviesGallery.Backend v1.0");
                    options.SwaggerEndpoint("/swagger/2.0/swagger.json", "MoviesGallery.Backend v2.0");
                });
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
