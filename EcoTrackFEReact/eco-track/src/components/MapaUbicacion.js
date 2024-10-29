import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapaUbicacion = ({ onLocationSave, userId }) => {
    const [position, setPosition] = useState({ lat: 13.68935, lon: -89.18718 });
    const [address, setAddress] = useState("");
    const [savedLocation, setSavedLocation] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        document.body.classList.add('estilo2');
        const storedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        if (storedLocation) {
            setSavedLocation(storedLocation);
            setPosition({ lat: storedLocation.lat, lon: storedLocation.lon });
            setAddress(storedLocation.address);
        }
        return () => {
            document.body.classList.remove('estilo2');
        };
    }, []);

    const handleSearch = () => {
        fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        setPosition({ lat, lon });
                        setAddress(data[0].display_name);
                        setSavedLocation({ lat, lon, address: data[0].display_name });
                    } else {
                        showAlertWithMessage('Coordenadas inválidas obtenidas de la búsqueda');
                    }
                } else {
                    showAlertWithMessage('Dirección no encontrada');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const HandleMapClick = () => {
        useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng;
            if (!isNaN(lat) && !isNaN(lng)) {
                setPosition({ lat, lon: lng });
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.display_name) {
                            setAddress(data.display_name);
                            setSavedLocation({ lat, lon: lng, address: data.display_name });
                        }
                    })
                    .catch(error => console.error('Error en la geocodificación inversa:', error));
            } else {
                showAlertWithMessage('Latitud o longitud inválida seleccionada en el mapa');
            }
        });
        return null;
    };

    const handleSaveLocation = () => {
        if (savedLocation) {
            const { lat, lon } = savedLocation;
            if (!isNaN(lat) && !isNaN(lon)) {
                const locationData = {
                    userId,
                    lat,
                    lon,
                    address: savedLocation.address,
                };
                localStorage.setItem('savedLocation', JSON.stringify(locationData));
                showAlertWithMessage('Ubicación guardada');
                console.log(savedLocation);
                if (typeof onLocationSave === 'function') {
                    onLocationSave(locationData);
                } else {
                    console.error('onLocationSave no es una función');
                }
            } else {
                showAlertWithMessage('Ubicación inválida. No se puede guardar.');
            }
        } else {
            showAlertWithMessage('No hay ubicación para guardar');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);

        // Desaparecer la alerta después de 3 segundos
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); // 3000 milisegundos = 3 segundos
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
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ingresa una dirección"
                />
                <button className="map-button" onClick={handleSearch}>
                    🔍
                </button>
            </div>
            <div className="map-container">
                <MapContainer 
                    center={[position.lat, position.lon]} 
                    zoom={13} 
                    className="map" 
                    doubleClickZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <HandleMapClick />
                    {savedLocation && savedLocation.lat && savedLocation.lon && (
                        <Marker position={[savedLocation.lat, savedLocation.lon]} icon={markerIcon}>
                            <Popup>
                                {savedLocation.address || "Ubicación seleccionada"}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
            <button className="map-button" onClick={handleSaveLocation}>Guardar Ubicación</button>
            <footer className="footer">
                <span>© 2024 SummerTime Coders. Todos los derechos reservados.</span>
                <span>
                    <a href="/politicadeuso" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                        Políticas de Uso
                    </a>
                </span>
            </footer>

            {showAlert && (
                <div className="custom-alert-overlay-map">
                    <div className="custom-alert-content-map">
                        <p>{alertMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapaUbicacion;
