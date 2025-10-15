import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Login.css';
import logoA from './Audifonoslogo.png';
import Navbar from '../Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;
      
      // Se utiliza window.location.href para la redirección.
      window.location.href = '/MenuPaginas';

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <> 
      <header className="header">
        <Navbar />
      </header>
      <div className="container login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="logo-container">
            <img src={logoA} className="App-logo" alt="logo" />
          </div>

          <div className="login-card">
            <h4 className="login-title">Acceso a la Plataforma</h4>
            <h5 className="login-disclaimer">Contenido multimedia para aprender con música</h5>
            
            <div className="input-group">
              <label className="input-label">
                <span>Correo Electrónico:</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
              </label>

              <label className="input-label">
                <span>Contraseña:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  required
                />
              </label>
            </div>

            {error && <div className="login-error">{error}</div>}
            {success && <div className="login-success">{success}</div>}

            <button className="upload-button login-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Acceder'}
            </button>

            <p className="login-disclaimer">
              ¿Olvidaste tu contraseña?{' '}
              <a href="/Restablecer">
                Recupérala aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;