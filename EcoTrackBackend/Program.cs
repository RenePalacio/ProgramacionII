using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EcoTrack;


var builder = WebApplication.CreateBuilder(args);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://ecotrackprueba.vercel.app") // Permitir solo este origen
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Configuración de Entity Framework y servicios
builder.Services.AddDbContext<EcoTrackDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("EcoTrackDbContext"),
        new MySqlServerVersion(new Version(8, 0, 25)) // Asegúrate de usar la versión correcta de MySQL
    ));



builder.Services.AddControllers(); // Asegúrate de que esta línea está presente

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EcoTrack API", Version = "v1" });
});
builder.WebHost.UseUrls("http://localhost:5000");
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}


app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EcoTrack API v1"));



app.Run();
