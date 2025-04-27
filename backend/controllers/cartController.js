// Manejará la lógica de las peticiones relacionadas con el carrito de compras.
import cartService from "../services/cartService.js";

const cartController = {
  async getCart(req, res) {
    try {
      const userId = req.user.id_usr;
      const cartItems = await cartService.getCart(userId, req.headers);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addItem(req, res) {
    try {
      const userId = req.user.id_usr;
      const { id_snkr, talla, cantidad } = req.body;
      const cookieString = await cartService.addItem(
        userId,
        id_snkr,
        talla,
        cantidad,
        req.headers
      );
      res.setHeader("Set-Cookie", cookieString);
      res.status(201).json({ message: "Item agregado al carrito." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateItemQuantity(req, res) {
    try {
      const userId = req.user.id_usr;
      const { id_snkr, talla, cantidad } = req.body;
      const cookieString = await cartService.updateItemQuantity(
        userId,
        id_snkr,
        talla,
        cantidad,
        req.headers
      );
      if (cookieString) {
        res.setHeader("Set-Cookie", cookieString);
        res.status(200).json({ message: "Cantidad del item actualizada." });
      } else {
        res.status(404).json({ message: "Item no encontrado en el carrito." });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeItem(req, res) {
    try {
      const userId = req.user.id_usr;
      const { id_snkr, talla } = req.body;
      const cookieString = await cartService.removeItem(
        userId,
        id_snkr,
        talla,
        req.headers
      );
      if (cookieString) {
        res.setHeader("Set-Cookie", cookieString);
        res.status(200).json({ message: "Item eliminado del carrito." });
      } else {
        res.status(404).json({ message: "Item no encontrado en el carrito." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async removeAll(req, res) {
    try {
      const userId = req.user.id_usr;
      await cartService.removeAll(userId, req.headers, res);
      res.status(200).json({ message: "Carrito limpiado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cartController;
