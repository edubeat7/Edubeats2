import { useState } from 'react';
// Se elimina la importación de useNavigate
import { createClient } from '@supabase/supabase-js';

import './UpdatePassword.css'; // Nuevo archivo CSS
import logoA from '../Login/Audifonoslogo.png';
import Navbar from '../Navbar/Navbar';

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Se elimina la variable navigate

  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
  );

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // Supabase detecta automáticamente la sesión del usuario desde el enlace de recuperación
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      }
      
      setSuccess('¡Contraseña actualizada con éxito! Redirigiendo al inicio de sesión...');

      setTimeout(() => {
        // Se reemplaza navigate por window.location.href
        window.location.href = '/login';
      }, 3000);

    } catch (err) {
      console.error(err);
      setError('Hubo un error al actualizar la contraseña. El enlace puede haber expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>
      <div className="update-password-container">
        <form onSubmit={handleUpdatePassword} className="update-password-form">
          <div className="logo-container">
            <img src={logoA} className="App-logo" alt="logo" />
          </div>

          <div className="update-password-card">
            <h1 className="update-password-title">Crear Nueva Contraseña</h1>
            <p className="update-password-disclaimer">
              Por favor, introduce tu nueva contraseña a continuación.
            </p>
            
            <div className="input-group">
              <label className="input-label">
                <span>Nueva Contraseña:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="update-password-input"
                  required
                  placeholder="Introduce tu nueva contraseña"
                />
              </label>
              <label className="input-label" style={{marginTop: '1rem'}}>
                <span>Confirmar Contraseña:</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="update-password-input"
                  required
                  placeholder="Confirma tu nueva contraseña"
                />
              </label>
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <button className="upload-button update-password-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;

