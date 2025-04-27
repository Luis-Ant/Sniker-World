import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext.jsx";
import { Link } from "react-router-dom";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Transition } from "@headlessui/react";

function CartSidebar({ isOpen, onClose }) {
  const {
    cart,
    cartLoading,
    updateCartItemQuantity,
    removeFromCart,
    products,
  } = useAppContext();
  const sidebarRef = useRef(null);
  const [removingItem, setRemovingItem] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = async (productId, talla, newQuantity) => {
    if (newQuantity >= 1) {
      await updateCartItemQuantity(productId, talla, newQuantity);
    }
  };

  const handleRemoveItem = async (productId, talla) => {
    setRemovingItem({ id_snkr: productId, talla });
    try {
      await removeFromCart(productId, talla); // Llama a la función del contexto
    } catch (error) {
      console.error("Error removing item:", error);
      setRemovingItem(null);
      // Opcional: Mostrar un mensaje de error al usuario
    } finally {
      setTimeout(() => setRemovingItem(null), 300);
    }
  };

  let subtotal = 0;
  if (cart && cart.length > 0) {
    subtotal = cart.reduce((acc, item) => {
      const product = products.find((p) => p.id_snkr === item.id_snkr);
      return product ? acc + product.precio_snkr * item.cantidad : acc;
    }, 0);
  }

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Carrito de Compras
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {cartLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-2xl text-gray-500">Cargando carrito...</p>
          </div>
        ) : cart && cart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-2xl text-gray-500">Tu carrito está vacío.</p>
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto mb-4">
            {cart &&
              cart.map((item) => {
                const product = products.find(
                  (p) => p.id_snkr === item.id_snkr
                );
                if (!product) return null;

                const isRemoving =
                  removingItem &&
                  removingItem.id_snkr === item.id_snkr &&
                  removingItem.talla === item.talla;

                return (
                  <Transition
                    key={`${item.id_snkr}-${item.talla}`}
                    show={!isRemoving}
                    as={React.Fragment}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <li className="flex text-xl items-center py-3 border-b border-gray-200">
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
                          onClick={onClose}
                          className="font-semibold text-gray-700 hover:text-blue-500"
                        >
                          {product.modelo_snkr}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {product.marca_snkr} - Talla: {item.talla}
                        </p>
                        <p className="text-sm text-gray-600">
                          $
                          {product.precio_snkr.toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id_snkr,
                              item.talla,
                              item.cantidad - 1
                            )
                          }
                          className="text-gray-500 hover:text-blue-500 focus:outline-none"
                          disabled={item.cantidad <= 1}
                        >
                          <FiMinus className="h-5 w-5" />
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id_snkr,
                              item.talla,
                              item.cantidad + 1
                            )
                          }
                          className="text-gray-500 hover:text-blue-500 focus:outline-none"
                        >
                          <FiPlus className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveItem(item.id_snkr, item.talla)
                        }
                        className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </li>
                  </Transition>
                );
              })}
          </ul>
        )}

        {cart && cart.length > 0 && (
          <div className="text-xl mt-4 border-t border-gray-200 pt-4">
            <p className="font-medium text-gray-800">
              Subtotal: $
              {subtotal.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <Link
              to="/cart"
              onClick={onClose}
              className="block mt-4 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md text-center focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Proceder al pago
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
