import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'; // ⛔ Se elimina useHistory
import { useAccess } from '../Context/AccessContext2'; 
import './Pago1.css';
import Navbar from '../Navbar/Navbar';

const Pago1 = () => {
  // const history = useHistory(); // ⛔ Se elimina la instancia
  const { grantAccess } = useAccess(); 

  // ... (el resto de tus estados 'step', 'inputValue', etc. se quedan igual) ...
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState({ number: null, key: '' });

  const validKeys = ['hola', 'mundo', 'azul', 'morado', 'feliz'];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * validKeys.length);
    setChallenge({ number: randomIndex + 1, key: validKeys[randomIndex] });
  }, []); 

  // Manejador para verificar la clave
  const handleKeyCheck = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase().trim() === challenge.key) {
      setError('');
      
      // ¡ACCIÓN CLAVE! Llama a la función del contexto para otorgar el permiso
      grantAccess();
      
      // ✅ CAMBIO APLICADO: Se usa window.location.href
      // Esto recargará la página y te llevará a /Registro
      window.location.href = '/Registro';

    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setInputValue('');
    }
  };

  // ... (Tu función contactAdminOnWhatsApp se queda igual) ...
  const contactAdminOnWhatsApp = () => {
    const phoneNumber = '+584126779652';
    const message = encodeURIComponent("Hola, estoy interesado en los términos de pago y el servicio.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="container">
      <header className="header"><Navbar /></header>
      <div className="payment-container">
        <div className="payment-card">
          {step === 1 ? (
            // --- PASO 1: TÉRMINOS Y CONTACTO ---
            <div className="terms-container">
              <h1 className="header-title">Información de Pago</h1>
              <p className="payment-instruction">
                El acceso a nuestro contenido es válido por un mes. Una vez finalizado el servicio, es necesario renovar el pago para continuar.
              </p>
              <p className="payment-instruction">
                El costo del servicio es de <strong>5$</strong> o su equivalente en Bolívares a la tasa BCV del día.
              </p>
              <p className="payment-instruction">
                Para aclarar dudas o realizar el pago, por favor contáctanos a través de WhatsApp.
              </p>
              <button onClick={contactAdminOnWhatsApp} className="button button--whatsapp">
                Contactar por WhatsApp
              </button>
              <button onClick={() => setStep(2)} className="button button--primary">
                He leído y deseo continuar
              </button>
            </div>
          ) : (
            // --- PASO 2: VERIFICACIÓN DE CLAVE ---
            <div className="key-check-container">
              <h1 className="header-title">Verificación de Acceso</h1>
              <p className="payment-instruction">
                Para continuar, introduce la palabra clave que corresponde al número:
                <strong className="challenge-number"> {challenge.number}</strong>
              </p>
              <form onSubmit={handleKeyCheck} className="key-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="key-input"
                  placeholder="Introduce la clave aquí"
                  autoFocus
                  required
                />
                <button type="submit" className="button button--primary">
                  Verificar y Continuar
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pago1;