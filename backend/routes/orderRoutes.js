import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout/finalizar", orderController.finalizarCompra);

export default router;
