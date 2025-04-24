import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import api from '../api'; // Import Axios client

export default function ProductDetails() {
  const { id } = useParams(); // Get the sneaker ID from the URL
  const [sneaker, setSneaker] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await api.get(`/sneakers/${id}`);
        if (response.data.error) {
          throw new Error('Sneaker not found');
        }
        setSneaker(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sneaker:', err);
        setError('Failed to load sneaker');
        setLoading(false);
      }
    };
    fetchSneaker();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-[130px] text-center">Loading...</div>;
  }

  if (error || !sneaker) {
    return (
      <div className="min-h-screen pt-[130px] text-center text-red-500">
        {error || 'Sneaker not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[130px] bg-white p-4 flex flex-col lg:flex-row gap-8">
      <div>
        {/* Back arrow */}
        <Link
          to="/"
          className="absolute pt-[80px] top-4 left-4 sm:top-6 sm:left-8 text-gray-800 hover:text-sky-500 transition-all duration-300"
        >
          <ArrowLeft size={30} />
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-start">
        {sneaker.imagen_snkr ? (
          <img
            src={`data:image/jpeg;base64,${sneaker.imagen_snkr}`}
            alt={sneaker.modelo_snkr}
            className="w-full max-w-sm object-cover"
          />
        ) : (
          <div className="w-full max-w-sm h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <p className="uppercase font-bold">{sneaker.marca_snkr}</p>
          <h1 className="text-2xl font-bold">{sneaker.modelo_snkr}</h1>
          <p className="text-lg font-semibold mt-1">${sneaker.precio_snkr}</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Tallas</p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {sneaker.tallas_snkr && sneaker.tallas_snkr.length > 0 ? (
              sneaker.tallas_snkr.map((talla) => (
                <button
                  key={talla}
                  className="border border-black px-4 py-2 hover:bg-gray-100"
                >
                  {talla}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No sizes available</p>
            )}
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