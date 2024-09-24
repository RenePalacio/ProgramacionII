using EcoTrack.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcoTrack.Services
{
    public class UsuarioService
    {
        private readonly EcoTrackDbContext _dbContext;

        public UsuarioService(EcoTrackDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Obtener todos los usuarios
        public async Task<List<Usuario>> ObtenerTodosLosUsuarios()
        {
            return await _dbContext.Usuarios.ToListAsync();
        }

        // Obtener usuario por ID
        public async Task<Usuario?> ObtenerUsuarioPorId(int id)
        {
            return await _dbContext.Usuarios.FindAsync(id);
        }

        // Crear nuevo usuario
        public async Task<Usuario> CrearUsuario(Usuario usuario)
        {
            // Validación: verificar si el correo electrónico ya existe
            var existeUsuario = await _dbContext.Usuarios
                .AnyAsync(u => u.Email == usuario.Email);
            
            if (existeUsuario)
            {
                throw new InvalidOperationException("El correo electrónico ya está en uso.");
            }

            _dbContext.Usuarios.Add(usuario);
            await _dbContext.SaveChangesAsync();
            return usuario;
        }

        // Actualizar usuario
        public async Task<Usuario> ActualizarUsuario(Usuario usuario)
        {
            // Verificar si el usuario existe
            var usuarioExistente = await ObtenerUsuarioPorId(usuario.IdUsuario);
            if (usuarioExistente == null)
            {
                throw new KeyNotFoundException("Usuario no encontrado.");
            }

            _dbContext.Entry(usuario).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return usuario;
        }

        // Eliminar usuario
        public async Task EliminarUsuario(int id)
        {
            var usuario = await ObtenerUsuarioPorId(id);
            if (usuario == null)
            {
                throw new KeyNotFoundException("Usuario no encontrado.");
            }

            _dbContext.Usuarios.Remove(usuario);
            await _dbContext.SaveChangesAsync();
        }
    }
}
