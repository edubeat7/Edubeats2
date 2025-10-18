import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAccess } from '../Context/AccessContext2.jsx'; 

function PaymentRoute({ children }) {
  // ✅ 2. Obtiene el estado del permiso desde el contexto centralizado
  const { canAccessRegister } = useAccess();

  // 3. Verifica el estado
  if (canAccessRegister) {
    return children; // Si tiene permiso, muestra la página de Registro
  }

  // Si no, lo redirige
  return <Redirect to="/Pago1" />;
}

export default PaymentRoute;