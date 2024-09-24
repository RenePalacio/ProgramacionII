using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using EcoTrack.Services;
using Microsoft.OpenApi.Models;
using EcoTrack;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EcoTrackDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpClient<DatosClimaService>();
builder.Services.AddScoped<DatosClimaService>();
builder.Services.AddHttpClient<NotificacionService>();
builder.Services.AddScoped<NotificacionService>();
builder.Services.AddHttpClient<UsuarioService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<INotificacionService, NotificacionService>();
builder.Services.AddControllers(); // Asegúrate de que esta línea está presente

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EcoTrack API", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EcoTrack API v1"));

app.UseAuthorization();

app.MapControllers();

app.Run();
