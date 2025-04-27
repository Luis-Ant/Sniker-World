// Definirá las rutas de la API relacionadas con los productos (sneakers).
import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/deep/search", productController.searchProducts);

export default router;
