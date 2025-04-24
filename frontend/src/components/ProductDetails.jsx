import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const [cantidad, setCantidad] = useState(1);
  const tallas = [22, 23, 24, 25, 26, 27, 28];

  return (
    <div className="min-h-screen pt-[130px] bg-white p-4 flex flex-col lg:flex-row gap-8">
      <div>
        {/* Flecha de retorno */}
        <Link
          to="/"
          className="absolute pt-[80px] top-4 left-4 sm:top-6 sm:left-8 text-gray-800 hover:text-sky-500 transition-all duration-300"
        >
          <ArrowLeft size={30} />
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-start">
        <img
          src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/18cf40cc7c4f4d93b6a4afd1011d0d13_9366/Tenis_Samba_OG_Verde_IG1231_01_standard.jpg"
          alt="Tenis Adidas Samba OG"
          className="w-full max-w-sm object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <p className="uppercase font-bold">Adidas</p>
          <h1 className="text-2xl font-bold">Tenis Adidas Samba OG</h1>
          <p className="text-lg font-semibold mt-1">$2300</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Tallas</p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {tallas.map((talla) => (
              <button
                key={talla}
                className="border border-black px-4 py-2 hover:bg-gray-100"
              >
                {talla}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2 mt-4">Cantidad</p>
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

        <button className="bg-black text-white py-3 mt-6 font-bold tracking-wide">
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
}
