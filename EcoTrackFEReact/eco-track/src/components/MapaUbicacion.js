import React, { useState, useEffect } from 'react'; // Importar los hooks de React
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'; // Importar componentes de react-leaflet
import L from 'leaflet'; // Importar Leaflet para manejar los mapas
import 'leaflet/dist/leaflet.css'; // Importar los estilos de Leaflet
import './styles.css'; // Asegúrate de que tu CSS esté importado

// Configuración del ícono del marcador en el mapa
const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'), // URL del ícono
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapaUbicacion = ({ onLocationSave }) => {
    // Usar un estado para almacenar la latitud y longitud actuales
    const [position, setPosition] = useState({ lat: 13.68935, lon: -89.18718 });
    
    // Estado para almacenar el nombre o dirección de la ubicación seleccionada
    const [address, setAddress] = useState("");

    // Estado para almacenar la ubicación guardada
    const [savedLocation, setSavedLocation] = useState(null);

    // Estados para mostrar alertas
    const [alertMessage, setAlertMessage] = useState(""); // Mensaje de alerta
    const [showAlert, setShowAlert] = useState(false); // Mostrar/ocultar alerta

    // Este efecto se ejecuta al cargar el componente
    useEffect(() => {
        document.body.classList.add('estilo2'); // Añadir estilo a la página

        // Recuperar ubicación guardada desde el localStorage
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            // Si hay una ubicación guardada, actualizamos el estado
            setSavedLocation(storedLocation);
            setPosition({ lat: storedLocation.lat, lon: storedLocation.lon });
            setAddress(storedLocation.address);
        }

        return () => {
            document.body.classList.remove('estilo2'); // Eliminar estilo al desmontar el componente
        };
    }, []);

    // Función para manejar la búsqueda de la dirección introducida por el usuario
    const handleSearch = () => {
        fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Si encontramos coordenadas válidas, las usamos para actualizar el estado
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        setPosition({ lat, lon });
                        setAddress(data[0].display_name); // Actualizamos el nombre de la dirección
                        setSavedLocation({ lat, lon, address: data[0].display_name }); // Guardamos la ubicación seleccionada
                    } else {
                        setAlertMessage('Coordenadas inválidas obtenidas de la búsqueda');
                        setShowAlert(true); // Mostrar alerta
                    }
                } else {
                    setAlertMessage('Dirección no encontrada');
                    setShowAlert(true); // Mostrar alerta si no se encuentra la dirección
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Función para manejar el clic en el mapa
    const HandleMapClick = () => {
        useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng; // Obtener latitud y longitud del clic
            if (!isNaN(lat) && !isNaN(lng)) {
                setPosition({ lat, lon: lng });

                // Hacer una solicitud inversa para obtener la dirección
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.display_name) {
                            setAddress(data.display_name); // Actualizar el nombre de la dirección
                            setSavedLocation({ lat, lon: lng, address: data.display_name }); // Guardar ubicación
                        }
                    })
                    .catch(error => console.error('Error en la geocodificación inversa:', error));
            } else {
                setAlertMessage('Latitud o longitud inválida seleccionada en el mapa');
                setShowAlert(true); // Mostrar alerta
            }
        });

        return null;
    };

    // Función para guardar la ubicación seleccionada
    const handleSaveLocation = () => {
        if (savedLocation) {
            const { lat, lon } = savedLocation; // Extraer latitud y longitud

            if (!isNaN(lat) && !isNaN(lon)) {
                // Guarda la latitud, longitud y nombre de la ubicación en localStorage
                const locationData = {
                    lat: lat,
                    lon: lon,
                    address: savedLocation.address // Nombre o dirección a mostrar
                };

                localStorage.setItem('savedLocation', JSON.stringify(locationData)); // Guardar en localStorage
                setAlertMessage(`Ubicación guardada`); // Mensaje de éxito
                setShowAlert(true);
                onLocationSave(locationData); // Enviar los datos de ubicación al componente que llama
            } else {
                setAlertMessage('Ubicación inválida. No se puede guardar.');
                setShowAlert(true); // Mostrar alerta si los datos son inválidos
            }
        } else {
            setAlertMessage('No hay ubicación para guardar');
            setShowAlert(true); // Mostrar alerta si no hay ubicación seleccionada
        }
    };

    // Función para manejar la búsqueda cuando se presiona "Enter"
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch(); // Ejecutar búsqueda
        }
    };

    // Función para cerrar la alerta
    const handleCloseAlert = () => {
        setShowAlert(false); // Cerrar alerta
    };

    return (
        <div className="map-container-small">
            <div className="background-image"></div>
            <div className="mancha"></div>
            <div className="mancha2"></div>
            <header className="Ubiheader">
                <h1 className="logo-text">E C O T R A C K</h1>
            </header>
            <h1 className="map-title">Proporcionanos tu Ubicación</h1>
            <p className="map-subtitle">Esto nos ayudará a brindarte el servicio más acertado a tus necesidades</p>
            <div className="input-mapa-container">
                <input
                    className="map-input"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Actualizar dirección cuando el usuario escribe
                    onKeyPress={handleKeyPress} // Ejecutar búsqueda al presionar Enter
                    placeholder="Ingresa una dirección"
                />
                <button className="map-button" onClick={handleSearch}>
                    🔍
                </button>
            </div>
            <div className="map-container">
                <MapContainer 
                    center={[position.lat, position.lon]} // Usar posición actual (lat y lon)
                    zoom={13} 
                    className="map" 
                    doubleClickZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <HandleMapClick /> {/* Manejar clics en el mapa */}
                    <Marker position={[position.lat, position.lon]} icon={markerIcon}>
                        <Popup>
                            {address || "Ubicación seleccionada"} {/* Mostrar nombre de la ubicación */}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <button className="map-button" onClick={handleSaveLocation}>Guardar Ubicación</button>
            <footer className="footer">
                <span>© SummerTime Coders</span>
            </footer>

            {/* Componente de Alerta Personalizada */}
            {showAlert && (
                <div className="custom-alert-overlay-map">
                    <div className="custom-alert-content-map">
                        <p>{alertMessage}</p>
                        <button className="confirm-btn-map" onClick={handleCloseAlert}>Aceptar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapaUbicacion;
