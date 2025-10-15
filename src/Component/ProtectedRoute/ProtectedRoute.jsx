import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Asegúrate de que tus variables de entorno estén configuradas correctamente
const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

/**
 * Este componente verifica si un usuario ha iniciado sesión.
 * Si es así, renderiza la página solicitada.
 * Si no, lo redirige a la página de inicio.
 */
function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Comprobar la sesión del usuario al cargar el componente
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error al obtener la sesión:", error);
      }
      
      setSession(data.session);
      setIsLoading(false);
    };

    checkSession();

    // Escuchar cambios en el estado de autenticación (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Mientras se verifica la sesión, muestra un mensaje de carga
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#5c39db', color: 'white' }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  // Si no hay sesión, redirige a la página de inicio
  if (!session) {
    window.location.href = '/'; // Redirección a la página de inicio
    return null; // No renderiza nada mientras redirige
  }

  // Si hay una sesión, muestra el contenido protegido
  return children;
}

export default ProtectedRoute;
