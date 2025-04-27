import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id_snkr, modelo_snkr, marca_snkr, precio_snkr, imagen_url } = product;

  return (
    <Link
      to={`/product/${id_snkr}`}
      className="group relative block bg-white rounded-lg overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-w-3 aspect-h-4 sm:aspect-w-2 sm:aspect-h-3 h-56 sm:h-64">
        <img
          src={
            imagen_url ||
            "https://static.nike.com/a/images/w_1280,q_auto,f_auto/d0c03f2c-67bf-4994-ac8f-5b7108cd5cb6/fecha-de-lanzamiento-de-los-air-max-sndr-off-noir-and-diffused-blue-hf1199-700.jpg"
          }
          alt={modelo_snkr}
          className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-75"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-gray-700 group-hover:underline group-focus:underline">
          <span aria-hidden="true" className="text-lg absolute inset-0" />
          {modelo_snkr}
        </h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          $
          {precio_snkr.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="mt-1 text-sm text-gray-500">{marca_snkr}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
