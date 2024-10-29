using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EcoTrack;
using EcoTrack.Models;
using EcoTrackBackend.Services;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://ecotrackprueba.vercel.app")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials(); 
        });
});

// Configuración de Entity Framework y servicios
builder.Services.AddDbContext<EcoTrackDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("EcoTrackDbContext"),
        new MySqlServerVersion(new Version(8, 0, 25))
    ));

// Registro de servicios
builder.Services.AddHttpClient<ApiService>();
builder.Services.AddTransient<WeatherService>();
builder.Services.AddHostedService<NotificacionService>();



builder.Services.AddSignalR();

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EcoTrack API", Version = "v1" });
});

// Configura la URL de la aplicación
builder.Services.AddControllers();  // Esto es para tus rutas de la API

var app = builder.Build();

// Sirve archivos estáticos desde la carpeta 'Frontend'
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Frontend")),
    RequestPath = "",
    EnableDefaultFiles = true
});

app.UseRouting();
app.MapControllers();  // Mapea tus rutas del backend


app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EcoTrack API v1"));

app.Run();
