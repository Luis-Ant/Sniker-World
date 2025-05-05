import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppContext } from "./context/appContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import OrdenProcesoPage from "./pages/OrdenProcesoPage.jsx";
import PedidosPage from "./pages/PedidosPage.jsx";

function App() {
  const { isAuthenticated, authLoading } = useAppContext();

  const PublicRoute = ({ children }) => {
    if (authLoading) {
      return <div>Cargando...</div>;
    }
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  };

  const PrivateRoute = ({ children }) => {
    if (authLoading) {
      return <div>Cargando...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id_snkr" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orden-en-proceso"
          element={
            <PrivateRoute>
              <OrdenProcesoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/pedidos" element={<PedidosPage />} />
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
