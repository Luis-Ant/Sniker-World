import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results, onClose }) => {
  const firstTenResults = results.slice(0, 10);

  return (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-20 overflow-hidden">
      {firstTenResults.length > 0 ? (
        <ul>
          {firstTenResults.map((product) => (
            <li
              key={product.id_snkr}
              className="p-4 hover:bg-gray-100 transition-colors duration-150"
            >
              <Link
                to={`/product/${product.id_snkr}`}
                onClick={onClose}
                className="flex items-center"
              >
                <img
                  src={product.imagen_url || "https://via.placeholder.com/50"}
                  alt={product.modelo_snkr}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {product.modelo_snkr}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${product.precio_snkr}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          {results.length > 10 && (
            <li className="p-4 text-center text-gray-500">
              Mostrando los primeros 10 resultados de {results.length}
            </li>
          )}
        </ul>
      ) : (
        <div className="p-4 text-gray-600">No se encontraron resultados.</div>
      )}
    </div>
  );
};

export default SearchResults;
