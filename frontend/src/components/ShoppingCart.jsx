import React from "react";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
const productos = [
  {
    id: 1,
    nombre: "Tenis Adidas Samba OG",
    marca: "Adidas",
    precio: 2300,
    cantidad: 1,
    talla: "2.5",
    imagen:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/18cf40cc7c4f4d93b6a4afd1011d0d13_9366/Tenis_Samba_OG_Verde_IG1231_01_standard.jpg",
  },
  {
    id: 2,
    nombre: "Tenis Adidas Samba OG",
    marca: "Adidas",
    precio: 2300,
    cantidad: 1,
    talla: "3.0",
    imagen:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/18cf40cc7c4f4d93b6a4afd1011d0d13_9366/Tenis_Samba_OG_Verde_IG1231_01_standard.jpg",
  },
  {
    id: 3,
    nombre: "Tenis Adidas Samba OG",
    marca: "Adidas",
    precio: 2300,
    cantidad: 1,
    talla: "3.5",
    imagen:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/18cf40cc7c4f4d93b6a4afd1011d0d13_9366/Tenis_Samba_OG_Verde_IG1231_01_standard.jpg",
  },
];

export default function CarritoCompra() {
  return (
    <div className="min-h-screen pt-[80px] bg-white flex flex-col">
      <header className="border-b border-black p-4 flex items-center gap-4 text-xl font-bold tracking-wider">
      <Link to="/">
          <ArrowLeft className="cursor-pointer hover:text-sky-500 transition-all duration-300" />
      </Link>
        <span>MI CARRITO</span>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-2">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-300 py-4 gap-4"
          >
            <div className="flex gap-4 w-full sm:w-auto">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-24 h-24 object-cover"
              />
              <div className="flex flex-col px-4 sm:flex-row sm:items-center sm:gap-20 w-full">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold uppercase">{producto.marca}</p>
                  <p className="text-lg">{producto.nombre}</p>
                </div>
                <p className="font-bold mt-2 sm:mt-0">${producto.precio}</p>
                <p className="mt-1 sm:mt-0">Talla: {producto.talla}</p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button className="border border-black w-8 h-8 flex items-center justify-center">
                    <Minus size={16} />
                  </button>
                  <span>Cantidad: {producto.cantidad}</span>
                  <button className="border border-black w-8 h-8 flex items-center justify-center">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            <button className="text-red-600 px-4 self-start sm:self-auto">
              <Trash2 size={28} />
            </button>
          </div>
        ))}
      </main>

      <footer className="bg-gray-300 p-4 mt-auto">
        <div className="flex justify-between py-1">
          <span>SUBTOTAL</span>
          <span className="font-bold">$2300 MXM</span>
        </div>
        <div className="flex justify-between py-1">
          <span>TOTAL</span>
          <span className="font-bold">$2300 MXM</span>
        </div>
        <div className="mt-4 flex justify-center sm:justify-center">
          <button className="bg-red-600 text-white px-8 py-2 text-lg font-semibold">
            PAGAR
          </button>
        </div>
      </footer>
    </div>
  );
}