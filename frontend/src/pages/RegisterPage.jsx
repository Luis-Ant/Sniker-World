import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Notification from "../components/Notification";

const RegisterPage = () => {
  const [nombre_usr, setNombreUsr] = useState("");
  const [apellido_usr, setApellidoUsr] = useState("");
  const [correo_usr, setCorreoUsr] = useState("");
  const [telefono_usr, setTelefonoUsr] = useState("");
  const [contrasena_usr, setContrasenaUsr] = useState("");
  const [confirmContrasena, setConfirmContrasena] = useState("");
  const [direccion_usr, setDireccionUsr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const navigate = useNavigate();
  const { registerUser } = useAppContext();

  const handleCloseNotification = () => {
    setNotificationMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas del lado del cliente
    if (
      !nombre_usr ||
      !apellido_usr ||
      !correo_usr ||
      !telefono_usr ||
      !contrasena_usr ||
      !confirmContrasena
    ) {
      setNotificationMessage(
        "Por favor, completa todos los campos obligatorios."
      );
      setNotificationType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_usr)) {
      setNotificationMessage(
        "Por favor, introduce un correo electrónico válido."
      );
      setNotificationType("error");
      return;
    }

    if (!/^\d+$/.test(telefono_usr)) {
      setNotificationMessage(
        "Por favor, introduce un número de teléfono válido."
      );
      setNotificationType("error");
      return;
    }

    if (contrasena_usr.length < 6) {
      setNotificationMessage("La contraseña debe tener al menos 6 caracteres.");
      setNotificationType("error");
      return;
    }

    if (contrasena_usr !== confirmContrasena) {
      setNotificationMessage("Las contraseñas no coinciden.");
      setNotificationType("error");
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        nombre_usr,
        apellido_usr,
        correo_usr,
        telefono_usr,
        contrasena_usr,
        direccion_usr: direccion_usr || null, // Permitir que la dirección sea null si no se proporciona
      };
      await registerUser(userData);
      setNotificationMessage("Registro exitoso. Redirigiendo...");
      setNotificationType("success");
      setTimeout(() => {
        navigate("/login"); // Redirige a la página de inicio de sesión después del registro
      }, 2000);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setNotificationMessage(
        error.message || "Hubo un error al registrar el usuario."
      );
      setNotificationType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {" "}
      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={handleCloseNotification}
      />
      <div className="max-w-xl w-full space-y-8 bg-white border-1 border-black p-10 rounded-lg shadow-md">
        {" "}
        <div>
          <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
            {" "}
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            {" "}
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-sky-600 hover:text-sky-500"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nombre_usr" className="sr-only">
                Nombre
              </label>
              <input
                id="nombre_usr"
                name="nombre_usr"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Nombre"
                value={nombre_usr}
                onChange={(e) => setNombreUsr(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="apellido_usr" className="sr-only">
                Apellido
              </label>
              <input
                id="apellido_usr"
                name="apellido_usr"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Apellido"
                value={apellido_usr}
                onChange={(e) => setApellidoUsr(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="correo_usr" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="correo_usr"
                name="correo_usr"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Correo electrónico"
                value={correo_usr}
                onChange={(e) => setCorreoUsr(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="telefono_usr" className="sr-only">
                Teléfono
              </label>
              <input
                id="telefono_usr"
                name="telefono_usr"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Teléfono"
                value={telefono_usr}
                onChange={(e) => setTelefonoUsr(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contrasena_usr" className="sr-only">
                Contraseña
              </label>
              <input
                id="contrasena_usr"
                name="contrasena_usr"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Contraseña"
                value={contrasena_usr}
                onChange={(e) => setContrasenaUsr(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmContrasena" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                id="confirmContrasena"
                name="confirmContrasena"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Confirmar Contraseña"
                value={confirmContrasena}
                onChange={(e) => setConfirmContrasena(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="direccion_usr" className="sr-only">
                Dirección (Opcional)
              </label>
              <input
                id="direccion_usr"
                name="direccion_usr"
                type="text"
                autoComplete="street-address"
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-1 sm:text-lg"
                placeholder="Dirección (Opcional)"
                value={direccion_usr}
                onChange={(e) => setDireccionUsr(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
