import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ✅ 1. ASEGÚRATE DE QUE LA RUTA A TU ARCHIVO DE CONTEXTO SEA CORRECTA
import { AccessProvider } from './Component/Context/AccessContext2'; // Ajusta si el nombre del archivo o carpeta es diferente

// Componentes de página
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Registro from "./Component/Registro/Registro";
import MenuPaginas from "./Component/MenuPaginas/MenuPaginas";
import Pago1 from "./Component/Pago1/Pago1";
import Restablecer from "./Component/Restablecer/Restablecer";
import UpdatePassword from "./Component/Restablecer/UpdatePassword";
import Administrador from "./Component/Administrador/Administrador";
import GeneradorPrueba from "./Component/PruebaAutomatica/GeneradorPrueba";
import PruebaAutomatica from "./Component/PruebaAutomatica/PruebaAutomatica";
import PaginaAudio from "./Component/PaginaAudio/PaginaAudio";
import ListaProveedores from "./Component/ListaProveedores/ListaProveedores";

// Componentes Guardianes
import PaymentRoute from './Component/PaymentRoute/PaymentRoute';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    // ✅ 2. ENVUELVE TODA LA APLICACIÓN CON EL ACCESSPROVIDER AQUÍ
    // Ahora, todos los componentes, incluyendo Pago1, tendrán acceso al contexto.
    <AccessProvider>
      <div className="container">
        <Router>
          <Switch>
            {/* --- RUTAS PÚBLICAS (Cualquiera puede acceder) --- */}
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Pago1" component={Pago1} />
            <Route exact path="/Restablecer" component={Restablecer} />
            <Route exact path="/GeneradorPrueba" component={GeneradorPrueba} />
            <Route exact path="/UpdatePassword" component={UpdatePassword} />
            
            {/* --- RUTA DE REGISTRO PROTEGIDA POR PAGO --- */}
            {/* ✅ 3. ESTA ES LA ÚNICA RUTA PARA /Registro Y ESTÁ PROTEGIDA */}
            <Route exact path="/Registro">
              <PaymentRoute>
                <Registro />
              </PaymentRoute>
            </Route>
            
            {/* --- RUTAS PROTEGIDAS (Requieren inicio de sesión) --- */}
            <Route exact path="/MenuPaginas">
              <ProtectedRoute> <MenuPaginas /> </ProtectedRoute>
            </Route>
            <Route exact path="/Administrador">
              <ProtectedRoute> <Administrador /> </ProtectedRoute>
            </Route>
            <Route exact path="/PruebaAutomatica">
              <ProtectedRoute> <PruebaAutomatica /> </ProtectedRoute>
            </Route>
            <Route exact path="/PaginaAudio">
               <ProtectedRoute> <PaginaAudio /> </ProtectedRoute>
            </Route>
            <Route exact path="/ListaProveedores">
               <ProtectedRoute> <ListaProveedores /> </ProtectedRoute>
            </Route>
          </Switch>
        </Router>
      </div>
    </AccessProvider>
  );
}

export default App;