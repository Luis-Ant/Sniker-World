// Manejará la lógica de las peticiones relacionadas con los productos (sneakers).
import productService from "../services/productService.js";

const productController = {
  // Metodo para obtener todos los productos
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Metodo para obtener un producto por su ID
  async getProductById(req, res) {
    try {
      const productId = parseInt(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ error: "ID de producto inválido." });
      }
      const product = await productService.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Metodo para buscar productos por un término
  async searchProducts(req, res) {
    try {
      const query = req.query.query;
      const results = await productService.searchProducts(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default productController;
