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
