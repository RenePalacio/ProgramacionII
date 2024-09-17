--Ejecuten Primero el Create Schema Para Evitar Problemas
CREATE SCHEMA EcoTrack;


CREATE TABLE EcoTrack.Usuarios (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL
);

CREATE TABLE EcoTrack.TipoActividades (
    idTipoActividad INT PRIMARY KEY IDENTITY(1,1),
    nombreActividad NVARCHAR(50) NOT NULL,
    descripcionActividad NVARCHAR(MAX) NULL
);

CREATE TABLE EcoTrack.Actividades (
    idActividad INT PRIMARY KEY IDENTITY(1,1),
    idUsuario INT NOT NULL,
    idTipoActividad INT NOT NULL,
    ubicacion NVARCHAR(100) NOT NULL,
    fecha DATETIME NOT NULL,
    duracion TIME NOT NULL,
    notas NVARCHAR(MAX) NULL,
    FOREIGN KEY (idUsuario) REFERENCES EcoTrack.Usuarios(idUsuario),
    FOREIGN KEY (idTipoActividad) REFERENCES EcoTrack.TipoActividades(idTipoActividad)
);

CREATE TABLE EcoTrack.DatosClima (
    idDatosClima INT PRIMARY KEY IDENTITY(1,1),
    idActividad INT NOT NULL,
    temperatura FLOAT NOT NULL,
    rayosUV FLOAT NOT NULL,
    probabilidadLluvia FLOAT NOT NULL,
    calidadAire NVARCHAR(50) NOT NULL,
    polvo NVARCHAR(50) NOT NULL,
    FOREIGN KEY (idActividad) REFERENCES EcoTrack.Actividades(idActividad)
);

CREATE TABLE EcoTrack.Notificaciones (
    idNotificacion INT PRIMARY KEY IDENTITY(1,1),
    idUsuario INT NOT NULL,
    idActividad INT NOT NULL,
    mensaje NVARCHAR(255) NOT NULL,
    fechaEnvio DATETIME NOT NULL,
    enviado BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (idUsuario) REFERENCES EcoTrack.Usuarios(idUsuario),
    FOREIGN KEY (idActividad) REFERENCES EcoTrack.Actividades(idActividad)
);
