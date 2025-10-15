import React, { useState, useEffect } from 'react';
import './Pago1.css';
import Navbar from '../Navbar/Navbar';

const PaymentPage = () => {
  const [step, setStep] = useState(1); // Step 1: Terms, Step 2: Key verification
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState({ number: null, key: '' });

  // Palabras clave válidas (en minúsculas)
  const validKeys = ['hola', 'mundo', 'azul', 'morado', 'feliz'];

  // Generar el desafío aleatorio una sola vez al cargar el componente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * validKeys.length);
    setChallenge({
      number: randomIndex + 1, // Número a mostrar (1-5)
      key: validKeys[randomIndex], // Palabra clave correcta correspondiente
    });
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  // Función para verificar la clave introducida
  const handleKeyCheck = (e) => {
    e.preventDefault();
    // Comprueba si el valor introducido coincide con la clave del desafío
    if (inputValue.toLowerCase().trim() === challenge.key) {
      setError('');
      // Redirecciona usando window.location.href
      window.location.href = '/Registro';
    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setInputValue(''); // Limpia el input para el siguiente intento
    }
  };

  const contactAdminOnWhatsApp = () => {
    const phoneNumber = '+584126779652'; // Reemplaza con tu número
    const message = encodeURIComponent("Hola, estoy interesado en los términos de pago y el servicio.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="container">
      <header className="header">
          <Navbar />
      </header>
      <div className="payment-container">
        <div className="payment-card">
          {step === 1 ? (
            // --- Step 1: Terms and Contact ---
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
              <button onClick={() => setStep(2)} className="button button--primary" style={{marginTop: '1rem'}}>
                He leído y deseo continuar
              </button>
            </div>
          ) : (
            // --- Step 2: Key Verification ---
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

export default PaymentPage;