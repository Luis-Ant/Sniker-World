// Definirá las rutas de la API relacionadas con el carrito de compras.
import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rutas protegidas, requieren autenticación
router.get("/all", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addItem);
router.put("/update", authMiddleware, cartController.updateItemQuantity);
router.delete("/remove", authMiddleware, cartController.removeItem);
router.delete("/clear", authMiddleware, cartController.removeAll);

export default router;
