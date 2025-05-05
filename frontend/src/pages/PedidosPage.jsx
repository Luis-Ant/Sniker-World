import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import { ClockLoader } from "react-spinners";
import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";
import { obtenerPedidos } from "../services/orderService";

dayjs.extend(relativeTime);
dayjs.locale("es");

function PedidosPage() {
  const { user, isAuthenticated } = useAppContext();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!isAuthenticated || !user?.decoded?.id_usr) {
        setError("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await obtenerPedidos();
        setPedidos(response);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Error al cargar los pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [isAuthenticated, user?.decoded?.id_usr]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <ClockLoader color="#3490dc" loading={true} size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <Link
          to="/"
          className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Pedidos</h1>

        {pedidos.length === 0 ? (
          <p className="text-gray-600">No has realizado ningún pedido aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID del Pedido
                  </th>
                  <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fecha del Pedido
                  </th>
                  <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id_pedido}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {pedido.id_pedido}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {dayjs(pedido.fecha_pedido).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          pedido.estado === "Pendiente"
                            ? "bg-yellow-200 text-yellow-700"
                            : pedido.estado === "Enviado"
                            ? "bg-blue-200 text-blue-700"
                            : pedido.estado === "Entregado"
                            ? "bg-green-200 text-green-700"
                            : pedido.estado === "Cancelado"
                            ? "bg-red-200 text-red-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      ${pedido.total_pedido.toFixed(2)}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/pedidos/${pedido.id_pedido}`}
                        className="text-sky-500 hover:text-sky-700 transition"
                      >
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PedidosPage;
