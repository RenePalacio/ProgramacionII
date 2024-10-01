import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Asegúrate de que aquí están tus estilos

const MenuDesplegable = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleNotepad = () => {
        alert("Notepad seleccionado");
        setMenuVisible(false); // Oculta el menú
    };

    const handleReminder = () => {
        alert("Reminder seleccionado");
        setMenuVisible(false); // Oculta el menú
    };

    const handleCreateTask = () => {
        alert("Create Task seleccionado");
        setMenuVisible(false); // Oculta el menú
    };

    return (
        <div className="menu-container">
            {/* Botón central para abrir/cerrar el menú */}
            <button className="central-button" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Menú desplegable */}
            {menuVisible && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleNotepad}>
                        Notepad
                    </button>
                    <button className="dropdown-item" onClick={handleReminder}>
                        Reminder
                    </button>
                    <button className="dropdown-item" onClick={handleCreateTask}>
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default MenuDesplegable;
