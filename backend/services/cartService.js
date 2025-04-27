// Manejar las peticiones http del carrito de compras.
import { parse, serialize } from "cookie";

const CART_COOKIE_NAME = "sniker_cart";

const cartService = {
  async getCart(userId, reqCookies) {
    const cookieHeader = reqCookies ? reqCookies.cookie : ""; // Accede al header 'Cookie'
    const parsedCookies = parse(cookieHeader || "");
    const cartString = parsedCookies[CART_COOKIE_NAME];

    if (cartString) {
      try {
        const cart = JSON.parse(cartString);
        return cart[userId] || [];
      } catch (error) {
        console.error("Error parsing cart cookie:", error);
        return [];
      }
    }

    return [];
  },

  async addItem(userId, id_snkr, talla, cantidad, reqCookies) {
    const cookieHeader = reqCookies ? reqCookies.cookie : "";
    const parsedCookies = parse(cookieHeader || "");
    const cartString = parsedCookies[CART_COOKIE_NAME];
    let cart = {};

    if (cartString) {
      try {
        cart = JSON.parse(cartString);
      } catch (error) {
        console.error("Error parsing cart cookie:", error);
      }
    }

    if (!cart[userId]) {
      cart[userId] = [];
    }

    const existingItemIndex = cart[userId].findIndex(
      (item) => item.id_snkr === id_snkr && item.talla === talla
    );

    if (existingItemIndex > -1) {
      cart[userId][existingItemIndex].cantidad += cantidad;
    } else {
      cart[userId].push({ id_snkr, talla, cantidad });
    }

    return serialize(CART_COOKIE_NAME, JSON.stringify(cart), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });
  },

  async updateItemQuantity(userId, id_snkr, talla, cantidad, reqCookies) {
    const cookieHeader = reqCookies ? reqCookies.cookie : "";
    const parsedCookies = parse(cookieHeader || "");
    const cartString = parsedCookies[CART_COOKIE_NAME];

    if (!cartString) {
      return null; // Carrito no existe
    }

    let cart = {};
    try {
      cart = JSON.parse(cartString);
    } catch (error) {
      console.error("Error parsing cart cookie:", error);
      return null;
    }

    if (!cart[userId]) {
      return null; // Carrito del usuario no existe
    }

    const itemIndex = cart[userId].findIndex(
      (item) => item.id_snkr === id_snkr && item.talla === talla
    );

    if (itemIndex > -1) {
      cart[userId][itemIndex].cantidad = cantidad;
      return serialize(CART_COOKIE_NAME, JSON.stringify(cart), {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
    }
    return null; // Item no encontrado
  },

  async removeItem(userId, id_snkr, talla, reqCookies) {
    const cookieHeader = reqCookies ? reqCookies.cookie : "";
    const parsedCookies = parse(cookieHeader || "");
    const cartString = parsedCookies[CART_COOKIE_NAME];

    if (!cartString) {
      return null; // Carrito no existe
    }

    let cart = {};
    try {
      cart = JSON.parse(cartString);
    } catch (error) {
      console.error("Error parsing cart cookie:", error);
      return null;
    }

    if (!cart[userId]) {
      return false; // Carrito del usuario no existe
    }

    const initialLength = cart[userId].length;
    cart[userId] = cart[userId].filter(
      (item) => !(item.id_snkr === id_snkr && item.talla === talla)
    );

    if (cart[userId].length < initialLength) {
      return serialize(CART_COOKIE_NAME, JSON.stringify(cart), {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
    }

    return false; // Item no encontrado
  },

  async removeAll(userId, reqCookies, res) {
    const cookieHeader = reqCookies ? reqCookies.cookie : "";
    const parsedCookies = parse(cookieHeader || "");
    const cartString = parsedCookies[CART_COOKIE_NAME];

    if (!cartString) {
      return; // Carrito no existe, no hay nada que limpiar
    }

    let cart = {};
    try {
      cart = JSON.parse(cartString);
    } catch (error) {
      console.error("Error parsing cart cookie:", error);
      return; // No se pudo parsear el carrito, no podemos limpiarlo de forma segura
    }

    if (cart[userId]) {
      delete cart[userId];
      const updatedCartString = JSON.stringify(cart);
      const serializedCookie = serialize(CART_COOKIE_NAME, updatedCartString, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      res.setHeader("Set-Cookie", serializedCookie);
    }
  },
};

export default cartService;
