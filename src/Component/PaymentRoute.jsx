// Archivo: /Component/PaymentRoute.jsx (Solución con Location State)

import React from 'react';
// Importamos los hooks y componentes necesarios de react-router-dom v5
import { Redirect, useLocation } from 'react-router-dom';

/**
 * Este componente protege una ruta verificando el "estado" de la navegación.
 * 1. Usa el hook `useLocation` para acceder a la información de la ruta actual.
 * 2. Revisa si en esa información se incluyó un estado `{ fromPayment: true }`.
 * 3. Si el estado existe, permite el acceso al componente hijo (Registro).
 * 4. Si no existe, redirige al usuario de vuelta a /Pago1.
 */
function PaymentRoute({ children }) {
  const location = useLocation();

  // Verificamos si la navegación hacia esta ruta se originó desde Pago1
  // y si se pasó el estado 'fromPayment'. El '?' (optional chaining)
  // evita errores si 'location.state' es nulo o indefinido.
  if (location.state?.fromPayment === true) {
    // Permiso concedido. Muestra la página de Registro.
    return children;
  }

  // Permiso denegado. El usuario intentó acceder directamente.
  return <Redirect to="/Pago1" />;
}

export default PaymentRoute;