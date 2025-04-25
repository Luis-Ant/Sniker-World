import React from "react";
import carritoIcono from "../assets/images/carrito.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-zinc-200 fixed z-10 drop-shadow-lg">
      <div className="flex items-center justify-between px-4 h-[80px]">
        {/* Logo */}
        <div className="flex-1 min-w-[120px]">
          <h1 className="text-2xl sm:text-3xl font-bold">Sniker World</h1>
        </div>

      

        {/* Controles de usuario y carrito */}
        <div className="flex-1 min-w-[150px] flex justify-end items-center space-x-4">
          <Link to="/login" className="text-gray-800 hover:text-sky-400 transition-all duration-300">
            Iniciar sesión
          </Link>
          <button className="text-gray-800 hover:text-sky-400 transition-all duration-300">
            Registrarse
          </button>
          <Link to="/carrito" className="relative">
            <img
              src={carritoIcono}
              alt="Carrito de compras"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition-all duration-300"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
