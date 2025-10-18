import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const AccessContext = createContext();

// 2. Creamos un "Proveedor"
export function AccessProvider({ children }) {
  
  // CAMBIO: Inicializamos el estado leyendo de sessionStorage.
  // Si 'canAccessRegister' es 'true' en sessionStorage, el estado inicial será true.
  const [canAccessRegister, setCanAccessRegister] = useState(
    sessionStorage.getItem('canAccessRegister') === 'true'
  );

  // Función para otorgar el permiso.
  const grantAccess = () => {
    // CAMBIO: Guardamos el permiso en sessionStorage ANTES de actualizar el estado.
    sessionStorage.setItem('canAccessRegister', 'true');
    setCanAccessRegister(true);
  };

  // El valor que compartiremos
  const value = { canAccessRegister, grantAccess };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
}

// 3. Hook personalizado
export function useAccess() {
  return useContext(AccessContext);
}