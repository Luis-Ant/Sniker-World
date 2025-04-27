import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification"; // Importa el componente de notificación

function ProductDetailPage() {
  const { id_snkr } = useParams();
  const { products, addToCart, productsLoading, productsError } =
    useAppContext();
  const [sneaker, setSneaker] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    console.log("ID de la URL:", id_snkr, typeof id_snkr);
    if (products && products.length > 0) {
      const foundSneaker = products.find(
        (prod) => prod.id_snkr === parseInt(id_snkr)
      );
      if (foundSneaker) {
        setSneaker(foundSneaker);
        setLoading(false);
      } else {
        setLoading(false);
        setError("Producto no encontrado.");
      }
    } else if (!productsLoading) {
      setLoading(false);
      setError("No se pudieron cargar los productos.");
    } else if (productsError) {
      setLoading(false);
      setError(`Error al cargar los productos: ${productsError}`);
    }
  }, [id_snkr, products, productsLoading, productsError]);

  const handleTallaSelect = (talla) => {
    setSelectedTalla(talla);
  };

  const handleAddToCart = () => {
    if (sneaker && selectedTalla) {
      addToCart(sneaker.id_snkr, selectedTalla, cantidad);
      setNotificationMessage(`${sneaker.modelo_snkr} agregado al carrito.`);
      setNotificationType("success");
    } else if (!selectedTalla) {
      setNotificationMessage("Por favor, selecciona una talla.");
      setNotificationType("error");
    }
  };

  const handleCloseNotification = () => {
    setNotificationMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-[130px] p-4 text-3xl flex justify-center items-center">
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-[130px] p-4 text-2xl flex justify-center items-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-[130px] p-4 text-3xl flex justify-center items-center">
          <p>No se encontró el producto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={handleCloseNotification}
      />
      <div className="pt-[100px] bg-white p-4 flex flex-col lg:flex-row gap-8">
        <div>
          {/* Back arrow */}
          <Link
            to="/"
            className="absolute pt-[70px] top-8 left-4 sm:top-10 sm:left-8 text-gray-800 hover:text-sky-500 transition-all duration-300"
          >
            <ArrowLeft size={30} />
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-start">
          <img
            src={
              sneaker.imagen_url ||
              "https://static.nike.com/a/images/w_1280,q_auto,f_auto/d0c03f2c-67bf-4994-ac8f-5b7108cd5cb6/fecha-de-lanzamiento-de-los-air-max-sndr-off-noir-and-diffused-blue-hf1199-700.jpg"
            }
            alt={sneaker.modelo_snkr}
            className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-75"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="uppercase text-xl font-bold">{sneaker.marca_snkr}</p>
            <h1 className="text-5xl font-bold">{sneaker.modelo_snkr}</h1>
            <p className="text-2xl font-extralight mt-1">
              $
              {sneaker.precio_snkr.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg pt-3 mb-2">Tallas</p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {sneaker.tallas_snkr &&
              Array.isArray(sneaker.tallas_snkr) &&
              sneaker.tallas_snkr.length > 0 ? (
                sneaker.tallas_snkr.map((talla) => (
                  <button
                    key={talla}
                    className={`border border-black px-4 py-2 hover:bg-gray-100 ${
                      selectedTalla === talla ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleTallaSelect(talla)}
                  >
                    {talla}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No sizes available</p>
              )}
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg mb-2 mt-4">Cantidad</p>
            <div className="flex items-center gap-2">
              <button
                className="border border-black w-10 h-10 flex items-center justify-center"
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              >
                -
              </button>
              <input
                type="text"
                value={cantidad}
                readOnly
                className="w-16 text-center border border-black py-2"
              />
              <button
                className="border border-black w-10 h-10 flex items-center justify-center"
                onClick={() => setCantidad(cantidad + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white text-xl py-3 mt-6 font-bold tracking-wide"
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
