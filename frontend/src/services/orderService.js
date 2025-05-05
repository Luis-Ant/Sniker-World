// frontend/services/orderService.js
import axiosInstance from "../utils/axiosConfig.js";

export const checkout = async (orderData) => {
  try {
    const response = await axiosInstance.post(
      "/order/checkout/finalizar",
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    throw error;
  }
};

export const obtenerPedidos = async () => {
  try {
    const response = await axiosInstance.get(`/order/pedidos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw error;
  }
};
