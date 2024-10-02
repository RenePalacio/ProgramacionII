import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet'; // Importa L desde leaflet
import 'leaflet/dist/leaflet.css';

// Configurar el icono manualmente
const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapaUbicacion = () => {
    const [position, setPosition] = useState([13.68935, -89.18718]); // Coordenadas iniciales
    const [address, setAddress] = useState("");
    const [savedLocation, setSavedLocation] = useState(null); // Para guardar la ubicación seleccionada

    const handleSearch = () => {
        fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    setPosition([lat, lon]);
                    setAddress(data[0].display_name); // Actualiza la dirección en la barra de búsqueda
                    setSavedLocation({ position: [lat, lon], address: data[0].display_name }); // Guarda la ubicación
                } else {
                    alert('Dirección no encontrada');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Capturar clic en el mapa
    const HandleMapClick = () => {
        useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng;
            console.log(`Latitud: ${lat}, Longitud: ${lng}`);
            setPosition([lat, lng]);

            // Geocodificación inversa para obtener la dirección
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.display_name) {
                        setAddress(data.display_name); // Actualiza la barra de búsqueda con la dirección
                        setSavedLocation({ position: [lat, lng], address: data.display_name }); // Guarda la ubicación
                        console.log("Dirección encontrada:", data.display_name); // Para depuración
                    }
                })
                .catch(error => console.error('Error en la geocodificación inversa:', error));
        });

        return null;
    };

    const handleSaveLocation = () => {
        if (savedLocation) {
            alert(`Ubicación guardada: ${savedLocation.address}`);
        } else {
            alert('No hay ubicación para guardar');
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <h1>Mapa Interactivo</h1>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa una dirección"
                style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
            />
            <button onClick={handleSearch} style={{ padding: "8px 12px" }}>Buscar</button>
            <button onClick={handleSaveLocation} style={{ padding: "8px 12px", marginLeft: "10px" }}>
                Guardar Ubicación
            </button>
            <MapContainer 
                center={position} 
                zoom={5} 
                style={{ flex: 1, width: "100%" }} 
                doubleClickZoom={false} // Deshabilitar zoom por doble clic
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <HandleMapClick /> {/* Componente para gestionar el clic en el mapa */}
                <Marker position={position} icon={markerIcon}>
                    <Popup>
                        {address || "Ubicación seleccionada"}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapaUbicacion;
