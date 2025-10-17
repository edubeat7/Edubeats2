// Archivo: /Component/Pago1/Pago1.jsx (Solución con Location State)

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // ✅ Paso 1: Importa useHistory
import './Pago1.css';
import Navbar from '../Navbar/Navbar';

const Pago1 = () => {
  const history = useHistory(); // ✅ Paso 2: Inicializa el hook
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState({ number: null, key: '' });

  const validKeys = ['hola', 'mundo', 'azul', 'morado', 'feliz'];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * validKeys.length);
    setChallenge({
      number: randomIndex + 1,
      key: validKeys[randomIndex],
    });
  }, []);

  const handleKeyCheck = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase().trim() === challenge.key) {
      setError('');
      
      // ✅ Paso 3: Redirige usando history.push y pasa el estado
      // Esto navega a /Registro y le adjunta un "permiso" secreto.
      history.push({
        pathname: '/Registro',
        state: { fromPayment: true }
      });

    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setInputValue('');
    }
  };

  const contactAdminOnWhatsApp = () => {
    const phoneNumber = '+584126779652';
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
            <div className="terms-container">
              <h1 className="header-title">Información de Pago</h1>
              <p className="payment-instruction">
                El acceso a nuestro contenido es válido por un mes. Una vez finalizado el servicio, es necesario renovar el pago para continuar.
              </p>
              <p className="payment-instruction">
                El costo del servicio es de <strong>5$</strong> o su equivalente en Bolívares a la tasa BCV del día.
              </p>
              <button onClick={contactAdminOnWhatsApp} className="button button--whatsapp">
                Contactar por WhatsApp
              </button>
              <button onClick={() => setStep(2)} className="button button--primary">
                He leído y deseo continuar
              </button>
            </div>
          ) : (
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