import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Navbar from "../components/Navbar";
import LoadingProducts from "../components/LoadingProducts.jsx";
import ErrorLoadingProducts from "../components/ErrorLoading.jsx";
import { Link } from "react-router-dom"; // Import Link for navigation

function HomePage() {
  const { products, productsLoading, productsError } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    marca: "",
    tipo: "",
    precio: "",
  });

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filters));
  }, [products, filters]);

  const applyFilters = (productsToFilter, currentFilters) => {
    return productsToFilter
      .filter((product) => {
        const marcaMatch =
          !currentFilters.marca ||
          product.marca_snkr.toLowerCase() ===
            currentFilters.marca.toLowerCase();
        const tipoMatch =
          !currentFilters.tipo ||
          product.tipo_snkr.toLowerCase() === currentFilters.tipo.toLowerCase();

        let precioMatch = true;
        if (currentFilters.precio === "masBajo") {
          // No se aplica filtro directo aquí, el ordenamiento se hace aparte
        } else if (currentFilters.precio === "masAlto") {
          // No se aplica filtro directo aquí, el ordenamiento se hace aparte
        }

        return marcaMatch && tipoMatch && precioMatch;
      })
      .sort((a, b) => {
        if (currentFilters.precio === "masBajo") {
          return a.precio_snkr - b.precio_snkr;
        } else if (currentFilters.precio === "masAlto") {
          return b.precio_snkr - a.precio_snkr;
        }
        return 0; // Sin ordenamiento por precio por defecto
      });
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  if (productsLoading) {
    return <LoadingProducts />;
  }

  if (productsError) {
    return <ErrorLoadingProducts />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-jersey text-3xl font-bold text-gray-800">
            Productos Destacados
          </h1>
          <div className="flex flex-wrap gap-2">
            <select
              className="p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-[16px]"
              value={filters.marca}
              onChange={(e) => handleFilterChange("marca", e.target.value)}
            >
              <option value="">Filtrar por Marca</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="new balance">New Balance</option>
              <option value="reebok">Reebok</option>
              <option value="puma">Puma</option>
            </select>

            <select
              className="p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-[16px]"
              value={filters.tipo}
              onChange={(e) => handleFilterChange("tipo", e.target.value)}
            >
              <option value="">Filtrar por Género</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="unisex">Unisex</option>
            </select>

            <select
              className="p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-[16px]"
              value={filters.precio}
              onChange={(e) => handleFilterChange("precio", e.target.value)}
            >
              <option value="">Ordenar por Precio</option>
              <option value="masBajo">Más Bajo a Más Alto</option>
              <option value="masAlto">Más Alto a Más Bajo</option>
            </select>
          </div>
        </div>

        {/* Tarjeta de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id_snkr} product={product} />
          ))}
        </div>

        {/* Marcas Populares */}
        <div className="py-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Marcas Populares
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Reemplaza las URLs con las reales */}
            <div className="w-40 h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxWjbiOX8rYuq720FgrIefCPVC-y-gHSUYg&s"
                alt="Nike"
                className="max-h-25 max-w-25"
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIO9HvRepmQOPQJtDj-jBhpxzG3DGQDZuYWA&s"
                alt="Adidas"
                className="max-h-25 max-w-25"
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md">
              <img
                src="https://cdn.freebiesupply.com/logos/large/2x/new-balance-2-logo-black-and-white.png"
                alt="New Balance"
                className="max-h-25 max-w-25"
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md">
              <img
                src="https://logodownload.org/wp-content/uploads/2017/06/reebok-logo-5.png"
                alt="Reebok"
                className="max-h-25 max-w-25"
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOhHZ-0c3De3DFuwuosHkDnJRDwhDb-tLdw&s"
                alt="Puma"
                className="max-h-25 max-w-25"
              />
            </div>
            {/* Agrega más marcas aquí */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t border-gray-200 mt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Recursos</h6>
            <ul className="text-gray-500">
              <li className="mb-2">
                <Link to="/buscar-tienda" className="hover:text-sky-500">
                  Buscar Tienda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/hazte-miembro" className="hover:text-sky-500">
                  Hazte Miembro
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/envianos-comentarios" className="hover:text-sky-500">
                  Envíanos tus Comentarios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Ayuda</h6>
            <ul className="text-gray-500">
              <li className="mb-2">
                <Link to="/obtener-ayuda" className="hover:text-sky-500">
                  Obtener Ayuda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/estado-del-pedido" className="hover:text-sky-500">
                  Estado del Pedido
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/envio-y-entrega" className="hover:text-sky-500">
                  Envío y Entrega
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/devoluciones" className="hover:text-sky-500">
                  Devoluciones
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/opciones-de-pago" className="hover:text-sky-500">
                  Opciones de Pago
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/comunicate-con-nosotros"
                  className="hover:text-sky-500"
                >
                  Comunícate con Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Sniker World</h6>
            <ul className="text-gray-500">
              <li className="mb-2">
                <Link to="/acerca-de-nike" className="hover:text-sky-500">
                  Acerca de Sniker World
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/noticias" className="hover:text-sky-500">
                  Noticias
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/empleos" className="hover:text-sky-500">
                  Empleos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/inversionistas" className="hover:text-sky-500">
                  Inversionistas
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sostenibilidad" className="hover:text-sky-500">
                  Sostenibilidad
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/reportar-un-problema" className="hover:text-sky-500">
                  Reportar un Problema
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-4">Síguenos</h6>
            <ul className="text-gray-500">
              <li className="mb-2">
                <Link to="/facebook" className="hover:text-sky-500">
                  Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/twitter" className="hover:text-sky-500">
                  Twitter
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/instagram" className="hover:text-sky-500">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Tu Tienda de Sneakers. Todos los derechos
          reservados. |{" "}
          <Link to="/privacidad" className="hover:text-sky-500">
            Política de Privacidad
          </Link>{" "}
          |{" "}
          <Link to="/terminos" className="hover:text-sky-500">
            Términos de Uso
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
