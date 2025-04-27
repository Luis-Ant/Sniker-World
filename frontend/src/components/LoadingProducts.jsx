import React from "react";

const LoadingProducts = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative">
        {/* Círculos que se expanden y contraen */}
        <div className="animate-pulse absolute top-0 left-0 w-16 h-16 rounded-full bg-sky-500 opacity-75"></div>
        <div className="animate-pulse absolute top-0 left-0 w-16 h-16 rounded-full bg-sky-500 opacity-50 delay-150"></div>
        <div className="animate-pulse absolute top-0 left-0 w-16 h-16 rounded-full bg-sky-500 opacity-25 delay-300"></div>

        {/* Texto "Cargando..." */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 text-lg font-semibold text-gray-700">
          Cargando productos...
        </div>
      </div>
    </div>
  );
};

export default LoadingProducts;
