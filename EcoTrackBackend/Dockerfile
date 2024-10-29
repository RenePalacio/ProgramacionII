# Etapa 1: Build de la aplicación React
FROM node:16-alpine AS frontend-build
WORKDIR /app
COPY frontend/ .  # Asegúrate de que tus archivos React estén en 'frontend'
RUN npm install && npm run build

# Etapa 2: Build del backend ASP.NET Core
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY --from=frontend-build /app/build ./wwwroot  # Copia el build de React al backend
COPY backend/ .  # Asegúrate de que tus archivos ASP.NET estén en 'backend'
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Etapa 3: Imagen final para producción
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=base /app/out .
ENTRYPOINT ["dotnet", "TuProyecto.dll"]
