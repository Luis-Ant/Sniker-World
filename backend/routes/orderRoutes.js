import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout/finalizar", orderController.finalizarCompra);
router.get("/pedidos", authMiddleware, orderController.obtenerPedidos);

export default router;
