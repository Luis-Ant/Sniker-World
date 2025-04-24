import React from "react";
import carritoIcono from "../assets/images/carrito.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg">
      <div className="px-4 flex justify-between items-center w-full h-full">
        <div className="w-full flex items-center">
          <h1 className="text-3xl w-1/3 font-bold mr-4 sm:text-4xl">Sniker World</h1>

            {/* Buscador visible solo en pantallas medianas hacia arriba */}
            <div className="hidden md:flex w-1/3 min-w-[250px] mx-10 justify-center items-center">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
            </div>

            <div className="flex items-center justify-end w-1/3 px-6 space-x-6">
                {/* Botones de Iniciar sesión y Registrarse */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-800 hover:text-sky-400 transition-all duration-300">
                        Iniciar sesión
                    </button>
                    <button className="text-gray-800 hover:text-sky-400 transition-all duration-300">
                        Registrarse
                    </button>
                </div>

                {/* Icono de carrito */}
                <div className="flex items-center justify-center">
                    <Link to="/carrito" className="relative">
                        <img
                        src={carritoIcono}
                        alt="Carrito de compras"
                        className="w-8 h-8 cursor-pointer hover:opacity-80 transition-all duration-300"
                        />
                        {/* Si quieres agregar un contador de productos en el carrito */}
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        3 {/* Aquí puedes reemplazar el 3 por el estado dinámico */}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;