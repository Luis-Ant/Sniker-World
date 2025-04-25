import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const MainContent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await api.get('/sneakers');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sneakers:', err);
        setError('Failed to load sneakers');
        setLoading(false);
      }
    };
    fetchSneakers();
  }, []);

  // Filter products when searchQuery changes
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.modelo_snkr.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="w-full p-8 pt-[120px] text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-8 pt-[120px] text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-8 pt-[100px]">
      {/* Search Input - Centered */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar por modelo de sneaker..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {/* Sneaker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <button
              key={product.id_snkr}
              className="flex flex-col items-center bg-[#bb8a9d] p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => navigate(`/sneaker/${product.id_snkr}`)}
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
          ))
        ) : (
          <div className="col-span-full text-center text-white">
            No se encontraron sneakers que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;