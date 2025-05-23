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

  // Efecto para hacer scroll al inicio cuando el componente se monte
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Título y Filtros */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="font-jersey text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
            Productos Destacados
          </h1>
          <div className="grid grid-cols-3 gap-2 w-full max-w-2xl ml-auto">
            <select
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-sm md:text-base"
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
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-sm md:text-base"
              value={filters.tipo}
              onChange={(e) => handleFilterChange("tipo", e.target.value)}
            >
              <option value="">Filtrar por Género</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="unisex">Unisex</option>
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-sm md:text-base"
              value={filters.precio}
              onChange={(e) => handleFilterChange("precio", e.target.value)}
            >
              <option value="">Ordenar por Precio</option>
              <option value="masBajo">Más Bajo a Más Alto</option>
              <option value="masAlto">Más Alto a Más Bajo</option>
            </select>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id_snkr} product={product} />
          ))}
        </div>

        {/* Marcas Populares */}
        <div className="py-6 md:py-8 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            Marcas Populares
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxWjbiOX8rYuq720FgrIefCPVC-y-gHSUYg&s"
                alt="Nike"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIO9HvRepmQOPQJtDj-jBhpxzG3DGQDZuYWA&s"
                alt="Adidas"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md p-2">
              <img
                src="https://cdn.freebiesupply.com/logos/large/2x/new-balance-2-logo-black-and-white.png"
                alt="New Balance"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md p-2">
              <img
                src="https://logodownload.org/wp-content/uploads/2017/06/reebok-logo-5.png"
                alt="Reebok"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-full border-2 border-gray-300 flex justify-center items-center shadow-md p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOhHZ-0c3De3DFuwuosHkDnJRDwhDb-tLdw&s"
                alt="Puma"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 md:py-12 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h6 className="font-semibold text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Recursos
              </h6>
              <ul className="text-gray-500 text-sm md:text-base">
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
                  <Link
                    to="/envianos-comentarios"
                    className="hover:text-sky-500"
                  >
                    Envíanos tus Comentarios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Ayuda
              </h6>
              <ul className="text-gray-500 text-sm md:text-base">
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
              <h6 className="font-semibold text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Sniker World
              </h6>
              <ul className="text-gray-500 text-sm md:text-base">
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
                  <Link
                    to="/reportar-un-problema"
                    className="hover:text-sky-500"
                  >
                    Reportar un Problema
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Síguenos
              </h6>
              <ul className="text-gray-500 text-sm md:text-base">
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
          <div className="mt-6 md:mt-8 text-center text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Tu Tienda de Sneakers. Todos los
            derechos reservados. |{" "}
            <Link to="/privacidad" className="hover:text-sky-500">
              Política de Privacidad
            </Link>{" "}
            |{" "}
            <Link to="/terminos" className="hover:text-sky-500">
              Términos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
