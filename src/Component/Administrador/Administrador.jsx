import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import './Administrador.css';
import Navbar from '../Navbar/Navbar';

// Cliente de Supabase para operaciones de autenticación (usa la clave anónima)
const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

// Cliente de Supabase para operaciones de administrador (usa la clave de servicio)
// ADVERTENCIA: NUNCA expongas la clave de servicio en una aplicación de cliente en producción.
const supabaseAdmin = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE_KEY
);

function AdminDashboard() {
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isKeyAuthenticated, setIsKeyAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  const [oldUsers, setOldUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Paso 1: Verificar si el usuario logueado es el administrador
  useEffect(() => {
    const checkAdminUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && user.email === 'davidmurati1@gmail.com') {
        setIsAuthorizedUser(true);
      } else {
        setIsAuthorizedUser(false);
      }
      setIsCheckingUser(false);
    };

    checkAdminUser();
  }, []);

  // Paso 2: Cargar la lista de usuarios solo si ambas autenticaciones son correctas
  useEffect(() => {
    if (isAuthorizedUser && isKeyAuthenticated) {
      fetchOldUsers();
    }
  }, [isAuthorizedUser, isKeyAuthenticated]);

  // Función para verificar la clave secreta
  const handleKeySubmit = (event) => {
    event.preventDefault();
    if (adminKey === 'holamundo') {
      setIsKeyAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Clave de administrador incorrecta.');
    }
  };

  // Función para obtener los usuarios registrados hace más de 30 días
  const fetchOldUsers = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) throw listError;
      const usersToFilter = users.filter(user => new Date(user.created_at) < thirtyDaysAgo);
      setOldUsers(usersToFilter);
    } catch (err) {
      setError('No se pudo obtener la lista de usuarios.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar la eliminación de usuarios
  const handleDeleteOldUsers = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${oldUsers.length} usuarios?`)) {
      setIsLoading(true);
      try {
        const deletionPromises = oldUsers.map(user => supabaseAdmin.auth.admin.deleteUser(user.id));
        await Promise.all(deletionPromises);
        setSuccess(`${oldUsers.length} usuarios han sido eliminados.`);
        fetchOldUsers();
      } catch (err) {
        setError('Ocurrió un error al eliminar los usuarios.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // --- Renderizado Condicional ---

  if (isCheckingUser) {
    return (
      <div className="admin-container"><div className="admin-login-card"><p>Verificando identidad...</p></div></div>
    );
  }

  if (!isAuthorizedUser) {
    return (
      <>
        <header className="header"><Navbar /></header>
        <div className="admin-container">
          <div className="admin-login-card">
            <h1 className="admin-title">Acceso Denegado</h1>
            <p className="admin-disclaimer">No tienes permiso para acceder a esta sección.</p>
          </div>
        </div>
      </>
    );
  }

  if (!isKeyAuthenticated) {
    return (
      <>
        <header className="header"><Navbar /></header>
        <div className="admin-container">
          <div className="admin-login-card">
            <h1 className="admin-title">Verificación Adicional</h1>
            <form onSubmit={handleKeySubmit} className="admin-login-form">
              <p className="admin-disclaimer">Por favor, introduce la clave de administrador.</p>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="admin-login-input"
                placeholder="Clave secreta"
                required
              />
              <button type="submit" className="upload-button access-button">Acceder</button>
              {authError && <div className="form-error" style={{ marginTop: '1rem' }}>{authError}</div>}
            </form>
          </div>
        </div>
      </>
    );
  }

  // Renderiza el panel de control si todo es correcto
  return (
    <>
      <header className="header"><Navbar /></header>
      <div className="admin-container">
        <div className="admin-card">
          <h1 className="admin-title">Panel de Administrador</h1>
          <p className="admin-disclaimer">Gestionar usuarios registrados hace más de 30 días.</p>
          <div className="security-warning">
            <strong>Atención:</strong> Las acciones aquí son permanentes.
          </div>
          {isLoading ? (<p>Cargando usuarios...</p>) : (
            <div className="user-list-section">
              <h2 className="section-title">Usuarios para Eliminar ({oldUsers.length})</h2>
              {oldUsers.length > 0 ? (
                <>
                  <ul className="user-list">
                    {oldUsers.map(user => (
                      <li key={user.id} className="user-item">
                        <span>{user.email}</span>
                        <span>Registrado: {new Date(user.created_at).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="upload-button delete-button" 
                    onClick={handleDeleteOldUsers}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Eliminando...' : `Eliminar ${oldUsers.length} Usuarios`}
                  </button>
                </>
              ) : (
                <p className="no-users-message">No hay usuarios que cumplan con el criterio.</p>
              )}
            </div>
          )}
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;