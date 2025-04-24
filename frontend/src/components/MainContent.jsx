import React from 'react';
import carritoIcono from "../assets/images/carrito.png";
import { Link } from 'react-router-dom';

// Array de ejemplo con información de los tenis
const products = [
  { id: 1, model: 'Air Jordan 1', brand: 'Nike', price: 120, image: '' },
  { id: 2, model: 'Yeezy 350', brand: 'Adidas', price: 220, image: '' },
  { id: 3, model: 'Nike Air Max', brand: 'Nike', price: 150, image: '' },
  { id: 4, model: 'UltraBoost 20', brand: 'Adidas', price: 180, image: '' },
  { id: 5, model: 'Converse Chuck Taylor', brand: 'Converse', price: 60, image: '' },
  { id: 6, model: 'Nike Air Force 1', brand: 'Nike', price: 90, image: '' },
  { id: 7, model: 'Yeezy 700', brand: 'Adidas', price: 280, image: '' },
  { id: 8, model: 'Puma RS-X', brand: 'Puma', price: 100, image: '' },
  { id: 9, model: 'New Balance 990', brand: 'New Balance', price: 150, image: '' },
  { id: 10, model: 'Vans Old Skool', brand: 'Vans', price: 55, image: '../assets/images/carrito.png' },
];

const MainContent = () => {
  return (
    <div className="w-full p-8 pt-[120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link to="/details"
          key={product.id}
          className="flex flex-col items-center bg-[#bb8a9d] p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => console.log(`Producto seleccionado: ${product.model}`)} // Aquí agregarás la lógica para ir a la vista de detalles
        >
          <img
            src={carritoIcono}
            alt={product.model}
            className="w-48 h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-white text-xl font-semibold mb-2">{product.model}</h2>
          <p className="text-white text-lg mb-2">{product.brand}</p>
          <p className="text-white text-lg font-bold">${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default MainContent;
