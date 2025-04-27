import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/appContext.jsx";
import Notification from "../components/Notification";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState(null);
  const { login, authLoading } = useAppContext();

  const handleCloseNotification = () => {
    setNotificationMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotificationMessage(null);

    // Validaciones básicas del lado cliente
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotificationMessage("Correo electrónico inválido.");
      setNotificationType("error");
      return;
    }

    if (password.length < 6) {
      setNotificationMessage("La contraseña debe tener al menos 6 caracteres.");
      setNotificationType("error");
      return;
    }

    try {
      await login(email, password);
    } catch (loginError) {
      console.error("Error al iniciar sesión:", loginError);
      setNotificationMessage(
        loginError.message ||
          "Error al iniciar sesión. Por favor, inténtalo de nuevo."
      );
      setNotificationType("error");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 border rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Iniciando Sesión...
          </h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Link
        to="/"
        className="absolute pt-[80px] top-4 left-4 sm:top-6 sm:left-8 text-gray-800 hover:text-sky-500 transition-all duration-300"
      >
        <ArrowLeft size={30} />
      </Link>
      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={handleCloseNotification}
      />
      <div className="w-full max-w-md p-8 border rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xl font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xl font-medium mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-xl py-2 rounded font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
            disabled={authLoading}
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-lg text-gray-600 hover:text-sky-500 transition"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
