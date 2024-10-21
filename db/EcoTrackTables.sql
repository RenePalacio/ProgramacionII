-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL
);

-- Crear tabla TipoActividades
CREATE TABLE TipoActividades (
    idTipoActividad INT PRIMARY KEY IDENTITY(1,1),
    nombreActividad NVARCHAR(50) NOT NULL,
    descripcionActividad NVARCHAR(MAX) NULL
);

-- Crear tabla Actividades con la hora
CREATE TABLE Actividades (
    idActividad INT PRIMARY KEY IDENTITY(1,1),
    idUsuario INT NOT NULL,
    idTipoActividad INT NOT NULL,
    ubicacion NVARCHAR(500) NOT NULL,
    fecha DATETIME NOT NULL,
    hora TIME(7) NOT NULL,  -- Hora de la actividad
    duracion INT NOT NULL, -- Duración de la actividad
    notas NVARCHAR(MAX) NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idTipoActividad) REFERENCES TipoActividades(idTipoActividad)
);

-- Crear tabla DatosClima
CREATE TABLE DatosClima (
    idDatosClima INT PRIMARY KEY IDENTITY(1,1),
    idActividad INT NOT NULL,
    temperatura FLOAT NOT NULL,
    rayosUV FLOAT NOT NULL,
    probabilidadLluvia FLOAT NOT NULL,
    calidadAire NVARCHAR(50) NOT NULL,
    polvo NVARCHAR(50) NOT NULL,
    FOREIGN KEY (idActividad) REFERENCES Actividades(idActividad)
);

-- Crear tabla Notificaciones
CREATE TABLE Notificaciones (
    idNotificacion INT PRIMARY KEY IDENTITY(1,1),
    idUsuario INT NOT NULL,
    idActividad INT NOT NULL,
    mensaje NVARCHAR(255) NOT NULL,
    fechaEnvio DATETIME NOT NULL,
    enviado BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idActividad) REFERENCES Actividades(idActividad)
);