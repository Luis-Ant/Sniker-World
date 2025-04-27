import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const ErrorLoadingProducts = ({ error, onRetry }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-xl p-8 text-center">
        <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Error al cargar los productos
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          Hubo un problema al intentar cargar la lista de productos. Por favor,
          inténtalo de nuevo.
        </p>
        {error && (
          <p className="text-red-500 text-sm mb-4">
            Detalles del error: {error.message || error.toString()}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Reintentar
          </button>
        )}
        {!onRetry && (
          <Link
            to="/"
            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Volver a la página principal
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorLoadingProducts;
