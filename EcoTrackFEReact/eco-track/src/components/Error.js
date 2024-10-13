import React, { useState } from 'react';
import './styles.css'; // Importa el archivo CSS

const ErrorPage = () => {
  const [showGif, setShowGif] = useState(false); // Estado para controlar la visibilidad del GIF

  const handleBackToHome = () => {
    window.location.href = '/'; // Redirigir al índice
  };

  // Función para reproducir el audio y mostrar el GIF
  const handleImageClick = () => {
    const audio = new Audio('/error.mp3'); // Ruta relativa desde la carpeta public
    audio.play();
    setShowGif(true); // Muestra el GIF

    // Ocultar el GIF después de 9 segundos
    setTimeout(() => {
      setShowGif(false);
    }, 9000); // 9000 milisegundos = 9 segundos
  };

  return (
    <div className="error-containerErrorPage">
      <div className="error-messageErrorPage">
        <h1>¡Oops!...</h1> 
        <h2>Algo ha salido mal</h2>
        <button onClick={handleBackToHome}>Volver al inicio</button>
      </div>
      <div className="error-imagesErrorPage">
        <div className="image-wrapper" style={{ position: 'relative' }}>
          <img 
            src="https://i.ibb.co/6vjs3CZ/OIP-2-removebg-preview-2.png" 
            alt="Ranita" 
            className="main-imageErrorPage" 
            onClick={handleImageClick} // Cambia a handleImageClick
          />
          {showGif && (
            <img 
                src="https://i.ibb.co/DRNNszn/frog-jumping.gif" 
                alt="GIF de rana saltando" 
                className="error-gif-overlay"
            />
            )}
          <img 
            src="https://i.ibb.co/Gv15Z18/af3f8cdc9e6261c2dddf89631b266cb5-junco-plano-de-planta-aqua-tica.webp" 
            alt="Planta 1" 
            className="side-imageErrorPage" 
            onClick={handleImageClick} // También puedes agregarlo aquí si quieres
          />
        </div>
      </div>
      
      <footer className="footer">
        <span>© SummerTime Coders</span>
      </footer>
    </div>
  );
};

export default ErrorPage;
