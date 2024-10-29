import { useEffect, useCallback } from 'react';

const MyComponent = ({ onLocationSave }) => {
    const handleSubmit = useCallback(() => {
        // Lógica para enviar datos
        console.log('Datos enviados');
    }, []);

    useEffect(() => {
        // Lógica que depende de handleSubmit
        console.log('MyComponent renderizado');
    }, [handleSubmit]);

    
};

export default MyComponent;
