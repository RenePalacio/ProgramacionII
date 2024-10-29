import React from 'react';
import './styles.css'; // Asegúrate de que este archivo exista y esté en la ubicación correcta

const PoliticasDeUso = () => {
    const politicas = {
        titulo: "Políticas de Uso de la Aplicación Planificador de Actividades",
        version: "1.0",
        fecha: "2024-10-28",
        secciones: {
            introduccion: "Bienvenido a la aplicación Planificador de Actividades. Al utilizar nuestra app, aceptas cumplir con las siguientes políticas de uso.",
            requisitosDelUsuario: {
                descripcion: "Para usar la aplicación, debes proporcionar información precisa sobre tus actividades, incluyendo ubicación, hora y notas.",
                requisitos: [
                    "Tener al menos 13 años de edad.",
                    "Proporcionar información verdadera y exacta.",
                    "Mantener la confidencialidad de tu cuenta y contraseña."
                ]
            },
            usoDeDatos: {
                descripcion: "Recopilamos datos de ubicación y actividad para proporcionar información personalizada sobre el clima y otras notificaciones.",
                datosRecopilados: [
                    "Ubicación del usuario.",
                    "Hora y tipo de actividad.",
                    "Notas ingresadas por el usuario."
                ],
                usoDeDatos: "Los datos se utilizan únicamente para mejorar la experiencia del usuario y no se compartirán con terceros sin tu consentimiento."
            },
            notificaciones: {
                descripcion: "La aplicación enviará notificaciones sobre el clima y recordatorios de actividades programadas.",
                optIn: "Puedes optar por no recibir notificaciones en cualquier momento desde la configuración de la aplicación."
            },
            derechosDelUsuario: {
                descripcion: "Tienes derechos sobre tus datos personales y puedes solicitar su modificación en cualquier momento.",
                derechos: [
                    "Acceso a tus datos personales.",
                    "Corrección de información incorrecta."
                ]
            },
            cambiosEnLasPoliticas: {
                descripcion: "Nos reservamos el derecho de modificar estas políticas de uso en cualquier momento. Las modificaciones se publicarán en la aplicación y se te notificará."
            },
            contacto: {
                descripcion: "Si tienes preguntas sobre estas políticas, contáctanos a través de la sección de ayuda en la aplicación o envíanos un correo a <strong>contacto@ecotrack.com</strong>."
            }
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.cloud1} className="cloud"></div>
            <div style={styles.cloud2} className="cloud"></div>
            <div style={styles.cloud3} className="cloud"></div>
            <div style={styles.cloud4} className="cloud"></div>
            <div style={styles.cloud6} className="cloud"></div>
            <div style={styles.cloud7} className="cloud"></div>
            <div style={styles.cloud8} className="cloud"></div>

            <div style={styles.container}>
                <h1 className="title-politica">{politicas.titulo}</h1>
                <p style={styles.versionFecha}>
                    <strong>Versión:</strong> {politicas.version} | <strong>Fecha:</strong> {politicas.fecha}
                </p>
                {Object.entries(politicas.secciones).map(([key, section]) => (
                    <div style={styles.section} key={key}>
                        <h2 style={styles.sectionTitle}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </h2>
                        {key === 'contacto' ? (
                            <p
                                style={styles.sectionDescription}
                                dangerouslySetInnerHTML={{ __html: section.descripcion }}
                            />
                        ) : (
                            <>
                                <p style={styles.sectionDescription}>{section.descripcion}</p>
                                {section.requisitos && (
                                    <ul style={styles.list}>
                                        {section.requisitos.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                )}
                                {section.datosRecopilados && (
                                    <ul style={styles.list}>
                                        {section.datosRecopilados.map((dato, index) => (
                                            <li key={index}>{dato}</li>
                                        ))}
                                    </ul>
                                )}
                                {section.usoDeDatos && <p style={styles.sectionDescription}>{section.usoDeDatos}</p>}
                                {section.optIn && <p style={styles.sectionDescription}>{section.optIn}</p>}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    background: {
        background: 'linear-gradient(to bottom right, #015b52, #adb69f)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        margin: '40px',
        fontFamily: "'Poppins', sans-serif",
        color: '#2c3e50',
        position: 'relative',
        zIndex: 1,
    },
    versionFecha: {
        fontSize: '14px',
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: '30px',
    },
    section: {
        marginBottom: '35px',
        borderBottom: '1px solid #ecf0f1',
        paddingBottom: '20px',
    },
    sectionTitle: {
        fontSize: '24px',
        color: '#000000',
        marginBottom: '15px',
        textTransform: 'capitalize',
    },
    sectionDescription: {
        fontSize: '16px',
        color: '#34495e',
        lineHeight: '1.6',
    },
    list: {
        paddingLeft: '20px',
        margin: '15px 0',
        color: '#2c3e50',
    },
    cloud1: {
        width: '300px',
        height: '250px',
        position: 'absolute',
        top: '20px',
        left: '1px',
        backgroundImage: "url('https://i.ibb.co/SsB90qS/nube.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud2: {
        width: '190px',
        height: '150px',
        position: 'absolute',
        top: '30px',
        right: '1px',
        backgroundImage: "url('https://i.ibb.co/N9N1htY/nube2.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud3: {
        width: '250px',
        height: '250px',
        position: 'absolute',
        top: '32%',
        right: '1px',
        backgroundImage: "url('https://i.ibb.co/VgWQVBg/nube3.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud4: {
        width: '190px',
        height: '150px',
        position: 'absolute',
        top: '60%',
        left: '1%',
        backgroundImage: "url('https://i.ibb.co/wWWjHFJ/nube2-copia.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud6: {
        width: '200px',
        height: '160px',
        position: 'absolute',
        marginTop: '45%',
        marginLeft: '75%',
        marginRight: '5%',
        backgroundImage: "url('https://i.ibb.co/N9N1htY/nube2.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud7: {
        width: '250px',
        height: '225px',
        position: 'absolute',
        marginTop: '30%',
        marginLeft: '75%',
        backgroundImage: "url('https://i.ibb.co/VgWQVBg/nube3.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
    cloud8: {
        width: '190px',
        height: '150px',
        position: 'absolute',
        marginTop: '45%',
        marginLeft: 'auto',
        marginRight: '65%',
        backgroundImage: "url('https://i.ibb.co/wWWjHFJ/nube2-copia.png')",
        zIndex: 0,
        backgroundSize: 'cover',
        opacity: 0.9,
        animation: 'float 10s infinite ease-in-out',
    },
};

export default PoliticasDeUso;
