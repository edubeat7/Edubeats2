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

      window.location.href = '/MenuPaginas';

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <Navbar />
      </header>

      <main className="login-main">
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            {/* Logo */}
            <div className="login-logo">
              <img src={logoA} className="App-logo" alt="Edubeats logo" />
            </div>

            {/* Card */}
            <div className="login-card">
              <div className="login-header">
                <h1 className="login-title">Iniciar Sesión</h1>
                <p className="login-subtitle">Accede a tu contenido educativo</p>
              </div>

              {/* Form Fields */}
              <div className="login-fields">
                <div className="input-group">
                  <label className="input-label" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Messages */}
              {error && <div className="login-error">{error}</div>}
              {success && <div className="login-success">{success}</div>}

              {/* Submit Button */}
              <button className="login-button" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Procesando...
                  </>
                ) : (
                  'Acceder'
                )}
              </button>

              {/* Links */}
              <div className="login-links">
                <a href="/Pago1" className="login-link">
                  ¿No tienes cuenta? <strong>Regístrate</strong>
                </a>
                <a href="/Restablecer" className="login-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;