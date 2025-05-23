import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.jsx";
import CartSidebar from "./CartSidebar";
import SearchResults from "./SearchResults";
import UserMenu from "./UserMenu"; // Importa el nuevo componente UserMenu
import { FiSearch, FiMenu } from "react-icons/fi";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const DEBOUNCE_DELAY = 300; // Milisegundos para el debounce

export default function Navbar() {
  const {
    cart,
    logout,
    isAuthenticated,
    user,
    handleSearch,
    searchQuery: contextSearchQuery,
    searchResults,
    searchLoading,
  } = useAppContext();
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(contextSearchQuery); // Estado local para el input
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Estado para controlar el menú de usuario
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const userButtonRef = useRef(null); // Referencia al botón de usuario
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    setLocalSearchQuery(contextSearchQuery); // Sincronizar el estado local con el del contexto
  }, [contextSearchQuery]);

  const toggleCarrito = () => {
    if (isAuthenticated) {
      setIsCarritoOpen(!isCarritoOpen);
    } else {
      navigate("/login");
    }
  };

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setLocalSearchQuery(newQuery);

    // Debounce the search
    clearTimeout(searchInputRef.current);
    searchInputRef.current = setTimeout(() => {
      handleSearch(newQuery);
    }, DEBOUNCE_DELAY);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (window.innerWidth < 768) {
      // Si es móvil
      setIsSearchExpanded(true);
    }
  };

  const handleSearchBlur = () => {
    // Small delay to allow clicks on search results
    setTimeout(() => {
      if (!isSearchExpanded) {
        setIsSearchFocused(false);
      }
    }, 150);
  };

  const clearSearch = () => {
    setLocalSearchQuery("");
    handleSearch("");
    setIsSearchFocused(false);
    if (window.innerWidth < 768) {
      // Si es móvil
      setIsSearchExpanded(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Cerrar el menú de usuario si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target) &&
        isUserMenuOpen
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const contador = cart
    ? cart.reduce((sum, i) => sum + (i.cantidad || 1), 0)
    : 0;

  return (
    <>
      <nav className="w-full px-4 py-2 border-b bg-white flex flex-col sticky top-0 z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <Link to="/" className="block w-60 md:w-80 h-auto">
              <h1 className="text-5xl md:text-6xl font-bold w-auto h-auto">
                Sniker World
              </h1>
            </Link>
          </div>

          {/* Buscador - Desktop */}
          <div className="flex-1 justify-center hidden md:flex">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={localSearchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              {localSearchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiSearch className="h-5 w-5" />
                </button>
              )}
              {isSearchFocused && localSearchQuery && searchLoading && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-20 overflow-hidden p-4 text-gray-600">
                  Buscando...
                </div>
              )}
              {isSearchFocused &&
                localSearchQuery &&
                !searchLoading &&
                searchResults.length > 0 && (
                  <SearchResults
                    results={searchResults}
                    onClose={clearSearch}
                  />
                )}
              {isSearchFocused &&
                localSearchQuery &&
                !searchLoading &&
                searchResults.length === 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-20 overflow-hidden p-4 text-gray-600">
                    No se encontraron resultados.
                  </div>
                )}
            </div>
          </div>

          {/* Botones + Carrito */}
          <div className="flex text-lg mr-3 items-center justify-end flex-1 space-x-4 md:space-x-6">
            {/* Botón de búsqueda móvil */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 hover:opacity-50 transition"
            >
              <FiSearch className="w-6 h-6" />
            </button>

            <button onClick={toggleCarrito} className="relative">
              <ShoppingCartIcon className="w-7 h-7 md:w-8 md:h-8 hover:opacity-50 transition cursor-pointer" />
              {contador > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {contador}
                </span>
              )}
            </button>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-gray-800 hover:text-sky-400 transition"
              >
                Iniciar sesión
              </Link>
            ) : (
              <div
                className="relative flex items-center justify-center"
                ref={userButtonRef}
              >
                <button
                  onClick={toggleUserMenu}
                  className="focus:outline-none hover:opacity-50 transition cursor-pointer flex items-center justify-center"
                >
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-900 rounded-full flex items-center justify-center">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
                {isUserMenuOpen && user?.decoded?.nombre_usr && (
                  <UserMenu
                    username={user.decoded.nombre_usr}
                    onLogout={logout}
                    onClose={toggleUserMenu}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barra de búsqueda expandible en móvil */}
        <div
          className={`md:hidden w-full transition-all duration-300 ease-in-out ${
            isSearchExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          } overflow-visible absolute top-full left-0 bg-white border-b shadow-md z-50`}
        >
          <div className="relative w-full px-4 py-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              autoComplete="off"
            />
            {localSearchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            )}
            <div className="absolute w-full left-0 mt-1">
              {isSearchFocused && localSearchQuery && searchLoading && (
                <div className="w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden p-4 text-gray-600">
                  Buscando...
                </div>
              )}
              {isSearchFocused &&
                localSearchQuery &&
                !searchLoading &&
                searchResults.length > 0 && (
                  <div className="w-full max-h-[300px] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                    <SearchResults
                      results={searchResults}
                      onClose={() => {
                        clearSearch();
                        setIsSearchExpanded(false);
                      }}
                    />
                  </div>
                )}
              {isSearchFocused &&
                localSearchQuery &&
                !searchLoading &&
                searchResults.length === 0 && (
                  <div className="w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden p-4 text-gray-600">
                    No se encontraron resultados.
                  </div>
                )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Carrito */}
      {isCarritoOpen && (
        <CartSidebar
          isOpen={isCarritoOpen}
          onClose={() => setIsCarritoOpen(false)}
        />
      )}
    </>
  );
}
