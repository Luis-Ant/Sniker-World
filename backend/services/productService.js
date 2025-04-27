// Manejará la lógica de negocio para las operaciones con productos (sneakers).
import db from "../config/database.js";
const { Sneaker } = db;
import { Op } from "sequelize";

const productService = {
  async getAllProducts() {
    return Sneaker.findAll();
  },

  async getProductById(id) {
    return Sneaker.findByPk(id);
  },

  async searchProducts(query) {
    return Sneaker.findAll({
      where: {
        [Op.or]: [
          { modelo_snkr: { [Op.iLike]: `%${query}%` } },
          { descripcion_snkr: { [Op.iLike]: `%${query}%` } },
          { marca_snkr: { [Op.iLike]: `%${query}%` } },
          { tipo_snkr: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
  },
};

export default productService;
