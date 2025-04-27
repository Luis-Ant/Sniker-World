import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Icono de éxito
import { ClockLoader } from "react-spinners"; // Animación de carga
import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("es");

function OrdenProcesoPage() {
  const [pedidoId] = useState(
    Math.random().toString(36).substring(2, 15).toUpperCase()
  );
  const [seguimiento] = useState(
    Math.random().toString(36).substring(2, 10).toUpperCase() +
      "-" +
      Math.floor(Math.random() * 1000)
  );
  const [fechaEntregaEstimada, setFechaEntregaEstimada] = useState("");

  useEffect(() => {
    const diasParaEntrega = Math.floor(Math.random() * 3) + 3;
    const fecha = dayjs().add(diasParaEntrega, "day");
    // Formato corregido: 'de' debe estar literal
    setFechaEntregaEstimada(fecha.format("dddd, DD [de] MMMM [de] YYYY"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md text-center">
        {/* Animación de Proceso */}
        <div className="flex flex-col items-center justify-center mb-8">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            ¡Pedido Recibido!
          </h1>
          <p className="text-gray-600 mb-4">
            Estamos preparando tu pedido con mucho cuidado.
          </p>
          <ClockLoader color="#3490dc" loading={true} size={60} />
          <p className="mt-4 text-gray-600">
            Tu pedido está en proceso de elaboración y empaquetado.
          </p>
        </div>

        {/* Detalles del Pedido */}
        <div className="mb-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Detalles de tu Pedido
          </h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">ID del Pedido:</span> {pedidoId}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Número de Seguimiento:</span>{" "}
            {seguimiento} (Este número se activará cuando el paquete sea
            enviado)
          </p>
          <p className="text-blue-500 font-semibold">
            Fecha de Entrega Estimada: {fechaEntregaEstimada}
          </p>
        </div>

        {/* Sección de Dudas Comunes */}
        <div className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            ¿Tienes Preguntas?
          </h2>
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-semibold text-gray-800">
                ¿Cuándo se enviará mi pedido?
              </h3>
              <p className="text-gray-600">
                Generalmente, los pedidos se envían dentro de 1-2 días hábiles
                después de ser recibidos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                ¿Cómo puedo rastrear mi paquete?
              </h3>
              <p className="text-gray-600">
                Una vez que tu pedido sea enviado, recibirás un correo
                electrónico con un enlace para rastrear tu paquete utilizando el
                número de seguimiento proporcionado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                ¿Qué hago si tengo alguna duda?
              </h3>
              <p className="text-gray-600">
                Puedes contactar a nuestro equipo de atención al cliente a
                través de nuestro formulario de contacto en la página de
                "Soporte" o respondiendo al correo electrónico de confirmación
                de tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* Botón para Volver a la Página Principal */}
        <Link
          to="/"
          className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Volver a la Página Principal
        </Link>
      </div>
    </div>
  );
}

export default OrdenProcesoPage;
