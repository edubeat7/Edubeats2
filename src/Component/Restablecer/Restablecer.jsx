import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import './Restablecer.css'; // Archivo CSS dedicado
import logoA from '../Login/Audifonoslogo.png';
import Navbar from '../Navbar/Navbar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
  );

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Llama a la función de Supabase para enviar el correo de recuperación
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/updatepassword', // URL a la que será redirigido el usuario desde el correo
      });

      if (error) {
        throw error;
      }
      
      setSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico.');

    } catch (err) {
      console.error(err);
      setError('Error al enviar el enlace. Verifica el correo e inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>
      <div className="forgot-password-container">
        <form onSubmit={handlePasswordReset} className="forgot-password-form">
          <div className="logo-container">
            <img src={logoA} className="App-logo" alt="logo" />
          </div>

          <div className="forgot-password-card">
            <h1 className="forgot-password-title">Recuperar Contraseña</h1>
            <p className="forgot-password-disclaimer">
              Ingresa tu correo electrónico para recibir un enlace y restablecer tu contraseña.
            </p>
            
            <div className="input-group">
              <label className="input-label">
                <span>Correo Electrónico:</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="forgot-password-input"
                  required
                  placeholder="tu@email.com"
                />
              </label>
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <button className="upload-button forgot-password-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Enlace'}
            </button>

            <p className="forgot-password-disclaimer" style={{marginTop: '1.5rem'}}>
              ¿Recordaste tu contraseña? <a href="/login">Volver al inicio de sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;