import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import { FiTrash2 } from "react-icons/fi";
import Notification from "../components/Notification";

function CartPage() {
  const {
    user,
    cart,
    products,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    performCheckout,
  } = useAppContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleRealizarCompra = async () => {
    try {
      const response = await performCheckout();
      console.log("Compra realizada exitosamente:", response);
      navigate("/orden-en-proceso");
      setErrorMessage("");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      setErrorMessage(error.message || "Hubo un error al realizar la compra.");
    }
  };

  // Método de pago inventado
  const metodoPago = "Tarjeta de Crédito terminada en ****-1234";

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id_snkr === item.id_snkr);
      return product ? total + product.precio_snkr * item.cantidad : total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const impuesto = subtotal * 0.16; // 16% de IVA
  const costoEnvio = subtotal > 2500 ? 0 : 150;
  const total = subtotal + impuesto + costoEnvio;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Detalles de tu Compra
        </h1>

        {cart.length === 0 ? (
          <div className="text-lg py-8 text-center">
            <p className="text-gray-600">
              Tu carrito está vacío. ¡Echa un vistazo a nuestros productos!
            </p>
            <Link
              to="/"
              className="inline-block mt-4 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Volver a la Tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Detalles de los Productos en el Carrito */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Artículos en tu Carrito
              </h2>
              <ul>
                {cart.map((item) => {
                  const product = products.find(
                    (p) => p.id_snkr === item.id_snkr
                  );
                  if (!product) return null;
                  return (
                    <li
                      key={`${item.id_snkr}-${item.talla}`}
                      className="flex items-center py-4 border-b border-gray-200"
                    >
                      <div className="w-24 h-20 overflow-hidden rounded-md mr-4">
                        <img
                          src={
                            product.imagen_url ||
                            "https://static.nike.com/a/images/w_1280,q_auto,f_auto/d0c03f2c-67bf-4994-ac8f-5b7108cd5cb6/fecha-de-lanzamiento-de-los-air-max-sndr-off-noir-and-diffused-blue-hf1199-700.jpg"
                          }
                          alt={product.modelo_snkr}
                          className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-75"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link
                          to={`/product/${item.id_snkr}`}
                          className="font-semibold text-xl text-gray-700 hover:text-blue-500"
                        >
                          {product.modelo_snkr}
                        </Link>
                        <p className="text-[16px] text-gray-500">
                          Talla: {item.talla}
                        </p>
                        <p className="text-[16px] text-gray-600">
                          ${product.precio_snkr} x {item.cantidad}
                        </p>
                      </div>
                      <div className="flex text-xl items-center space-x-2">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.id_snkr,
                              item.talla,
                              item.cantidad - 1
                            )
                          }
                          className="text-gray-500 hover:text-blue-500 focus:outline-none"
                          disabled={item.cantidad <= 1}
                        >
                          <span className="font-semibold">-</span>
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.id_snkr,
                              item.talla,
                              item.cantidad + 1
                            )
                          }
                          className="text-gray-500 hover:text-blue-500 focus:outline-none"
                        >
                          <span className="font-semibold">+</span>
                        </button>
                        <button
                          onClick={() =>
                            removeFromCart(item.id_snkr, item.talla)
                          }
                          className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Resumen del Pedido y Detalles de Envío/Pago */}
            <div className="col-span-1">
              <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Resumen del Pedido
                </h2>
                <div className="mb-4">
                  <p className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal:</span>
                    <span>
                      $
                      {subtotal.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p className="flex justify-between text-gray-600 mb-2">
                    <span>Impuesto (16%):</span>
                    <span>
                      $
                      {impuesto.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p className="flex justify-between text-gray-600 mb-2">
                    <span>Costo de Envío:</span>
                    <span>
                      $
                      {costoEnvio.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <hr className="my-2" />
                  <p className="flex justify-between font-semibold text-gray-800 text-xl">
                    <span>Total:</span>
                    <span>
                      $
                      {total.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700">
                  Información de Envío
                </h2>
                <div className="mb-4 text-gray-600">
                  <p>
                    <span className="font-semibold">Nombre:</span>{" "}
                    {user?.decoded?.nombre_usr} {user?.decoded?.apellido_usr}
                  </p>
                  <p>
                    <span className="font-semibold">Dirección:</span>{" "}
                    {user?.decoded?.direccion_usr}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {user?.decoded?.correo_usr}
                  </p>
                  <p>
                    <span className="font-semibold">Teléfono:</span>{" "}
                    {user?.decoded?.telefono_usr}
                  </p>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700">
                  Método de Pago
                </h2>
                <div className="mb-6 text-gray-600">
                  <p>{metodoPago}</p>
                  {/* Aquí podrías tener opciones para cambiar el método de pago */}
                </div>

                <button
                  onClick={handleRealizarCompra}
                  className="w-full text-xl bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mt-4 block text-center"
                >
                  Realizar la Compra
                </button>
              </div>
            </div>
          </div>
        )}
        {errorMessage && <Notification message={errorMessage} type="error" />}
      </div>
    </div>
  );
}

export default CartPage;
