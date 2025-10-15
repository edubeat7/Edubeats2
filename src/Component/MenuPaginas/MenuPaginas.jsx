import React from 'react';
import { createClient } from '@supabase/supabase-js'; // ¡Importante!
import './MenuPaginas.css';
import logoImage from '../Login/Audifonoslogo.png';

// Inicializar el cliente de Supabase
const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

const MenuSeleccion = () => {
  // Convertir la función a async para usar await
  const handleLogout = async () => {
    try {
      // Paso 1: Llamar a Supabase para cerrar la sesión del usuario
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error al cerrar sesión:', error);
      }
      
      // Paso 2: Una vez cerrada la sesión, redirigir al inicio
      window.location.href = '/Home';

    } catch (error) {
      console.error('Error inesperado durante el cierre de sesión:', error);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-form">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="App-logo" />
        </div>
        
        <div className="menu-card">
          <h1 className="menu-title">Seleccione una opción</h1>
          
          <div className="menu-options">
            
            <a href="/PruebaAutomatica" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span className="option-text">Cuestionario</span>
            </a>

            <a href="/ListaProveedores" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span className="option-text">Lista de proveedores</span>
            </a>

          <a href="/PaginaAudio" className="menu-option">
              <div className="option-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <span className="option-text">Audios educativos</span>
            </a>
          </div>

          
          <p className="menu-disclaimer">
            Seleccione una opción para continuar
          </p>
        </div>

        <div className="card2">
          <button 
            className="upload-button logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSeleccion;