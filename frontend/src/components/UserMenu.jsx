import React from "react";
import { Link } from "react-router-dom";

export default function UserMenu({ username, onLogout, onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-xl z-20">
      <div className="py-2">
        <span className="block px-4 py-2 text-xl font-bold text-gray-700 cursor-default">
          Hola @{username}
        </span>
        <Link
          to="/pedidos"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          onClick={onClose} // Cerrar el menú al navegar
        >
          Pedidos
        </Link>
        <button
          onClick={() => {
            onLogout();
            onClose(); // Cerrar el menú después de cerrar sesión
          }}
          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
