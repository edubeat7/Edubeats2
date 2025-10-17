import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Tus componentes de página
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Registro from "./Component/Registro/Registro";
import MenuPaginas from "./Component/MenuPaginas/MenuPaginas";
import Pago1 from "./Component/Pago1/Pago1";
import Restablecer from "./Component/Restablecer/Restablecer";
import UpdatePassword from "./Component/Restablecer/UpdatePassword";
import Administrador from "./Component/Administrador/Administrador";
import PruebaAutomatica from "./Component/PruebaAutomatica/PruebaAutomatica";
import PaginaAudio from "./Component/PaginaAudio/PaginaAudio";
import ListaProveedores from "./Component/ListaProveedores/ListaProveedores";

import PaymentRoute from './Component/PaymentRoute'; // Asegúrate que la ruta sea correcta

// ¡Paso 1: Importa el componente ProtectedRoute!
// (Asegúrate de que la ruta al archivo sea la correcta en tu proyecto)
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'; // Ajusta esta ruta si es necesario

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          {/* --- RUTAS PÚBLICAS (Cualquiera puede acceder) --- */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Registro">
            <Registro />
          </Route>
          <Route exact path="/Pago1">
            <Pago1 />
          </Route>
          <Route exact path="/Restablecer">
            <Restablecer />
          </Route>
          <Route exact path="/UpdatePassword">
            <UpdatePassword />
          </Route>
          

          <Route exact path="/Registro">
            <PaymentRoute>
              <Registro />
            </PaymentRoute>
          </Route>
          {/* --- RUTAS PROTEGIDAS (Requieren inicio de sesión) --- */}
          {/* Paso 2: Envuelve cada componente protegido con <ProtectedRoute> */}
          <Route exact path="/MenuPaginas">
            <ProtectedRoute>
              <MenuPaginas />
            </ProtectedRoute>
          </Route>
          <Route exact path="/Administrador">
            <ProtectedRoute>
              <Administrador />
            </ProtectedRoute>
          </Route>
          <Route exact path="/PruebaAutomatica">
            <ProtectedRoute>
              <PruebaAutomatica />
            </ProtectedRoute>
          </Route>
          <Route exact path="/PaginaAudio">
          <PaginaAudio />
        </Route>
        <Route exact path="/ListaProveedores">
          <ListaProveedores />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;