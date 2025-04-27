import React, { createContext, useState, useEffect, useContext } from "react";
import * as authService from "../services/authService.js";
import * as productService from "../services/productService.js";
import * as cartService from "../services/cartService.js";
import * as orderService from "../services/orderService.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await authService.verifyToken();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error("Error al verificar la autenticación inicial:", error);
      } finally {
        setAuthLoading(false);
      }

      setProductsLoading(true);
      try {
        const allProducts = await productService.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading initial products:", error);
      } finally {
        setProductsLoading(false);
      }

      setCartLoading(true);
      try {
        const initialCart = await cartService.getCart();
        setCart(initialCart);
      } catch (error) {
        console.error("Error loading initial cart:", error);
      } finally {
        setCartLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await authService.register(userData);
      console.log("Registro exitoso:", response);
    } catch (error) {
      console.error("Error en registerUser:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      setAuthLoading(false);
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setCart([]);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const fetchProductById = async (id) => {
    setProductsLoading(true);
    try {
      return await productService.getProductById(id);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchLoading(true);
    setSearchQuery(query);
    try {
      const results = await (productService &&
        productService.searchProducts(query));
      if (results) {
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const addToCart = async (productId, talla, cantidad) => {
    try {
      await cartService.addItem(productId, talla, cantidad);
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
      return { message: "Item agregado al carrito." };
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const updateCartItemQuantity = async (productId, talla, cantidad) => {
    try {
      const response = await cartService.updateItemQuantity(
        productId,
        talla,
        cantidad
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id_snkr === productId && item.talla === talla
            ? { ...item, cantidad }
            : item
        )
      );
      return response;
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId, talla) => {
    try {
      const response = await cartService.removeItem(productId, talla);
      setCart((prevCart) =>
        prevCart.filter(
          (item) => !(item.id_snkr === productId && item.talla === talla)
        )
      );
      return response;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const performCheckout = async () => {
    console.log(isAuthenticated);
    console.log(user);
    if (!isAuthenticated || !user?.decoded?.id_usr) {
      throw new Error("Usuario no autenticado.");
    }

    if (cart.length === 0) {
      throw new Error("El carrito está vacío.");
    }

    const orderItems = cart.map((item) => ({
      id_snkr: item.id_snkr,
      talla: item.talla,
      cantidad: item.cantidad,
    }));

    const totalPedido = cart.reduce((total, item) => {
      const product = products.find((p) => p.id_snkr === item.id_snkr);
      return product ? total + product.precio_snkr * item.cantidad : total;
    }, 0);

    const orderData = {
      usuarioId: user.decoded.id_usr,
      carritoItems: orderItems,
      totalPedido: totalPedido,
    };

    try {
      setCartLoading(true);
      const response = await orderService.checkout(orderData);
      clearCart();
      return response;
    } catch (error) {
      console.error("Error al realizar el checkout:", error);
      throw error;
    } finally {
      setCartLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    authLoading,
    products,
    productsLoading,
    cart,
    cartLoading,
    searchQuery,
    searchResults,
    searchLoading,
    registerUser,
    login,
    logout,
    fetchProductById,
    handleSearch,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    performCheckout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
