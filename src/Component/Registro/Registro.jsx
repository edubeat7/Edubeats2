import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import './Registro.css'; // Archivo CSS separado
import logoA from '../Login/Audifonoslogo.png';
import Navbar from '../Navbar/Navbar';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL, 
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Registro exitoso
      setSuccess('Registro exitoso. Redirigiendo al Login...');
      setTimeout(() => {
        window.location.href="/Login"; // Redirigir al Login después de 2 segundos
      }, 2000);

    } catch (err) {
      console.error(err);
      // Mostrar el mensaje de error específico
      setError(err.message || 'Error al registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>
      <div className="container signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="logo-container">
            <img src={logoA} className="App-logo" alt="logo" />
          </div>

          <div className="signup-card">
            <h4 className="signup-title">Registro en la Plataforma</h4>
            <h5 className="signup-disclaimer">Contenido multimedia para aprender con música</h5>
            
            <div className="input-group">
              <label className="input-label">
                <span>Correo Electrónico:</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signup-input"
                  required
                />
              </label>

              <label className="input-label">
                <span>Contraseña:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signup-input"
                  required
                />
              </label>
            </div>

            {error && <div className="signup-error">{error}</div>}
            {success && <div className="signup-success">{success}</div>}

            <button className="upload-button signup-button" type="submit">
              Registrarse
            </button>

            <p className="signup-disclaimer">
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default SignUp;