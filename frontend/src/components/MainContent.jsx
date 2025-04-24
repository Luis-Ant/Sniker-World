import React, { useEffect, useState } from 'react';
import api from '../api'; // Import the API client

const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await api.get('/sneakers'); // Fetch all sneakers
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sneakers:', err);
        setError('Failed to load sneakers');
        setLoading(false);
      }
    };
    fetchSneakers();
  }, []);

  if (loading) {
    return <div className="w-full p-8 pt-[120px] text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-8 pt-[120px] text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-8 pt-[120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <button
          key={product.id_snkr}
          className="flex flex-col items-center bg-[#bb8a9d] p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => console.log(`Producto seleccionado: ${product.modelo_snkr}`)}
        >
          {product.imagen_snkr ? (
            <img
              src={`data:image/jpeg;base64,${product.imagen_snkr}`}
              alt={product.modelo_snkr}
              className="w-48 h-48 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          <h2 className="text-white text-xl font-semibold mb-2">{product.modelo_snkr}</h2>
          <p className="text-white text-lg mb-2">{product.marca_snkr}</p>
          <p className="text-white text-lg font-bold">${product.precio_snkr}</p>
        </button>
      ))}
    </div>
  );
};

export default MainContent;