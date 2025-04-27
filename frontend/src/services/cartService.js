import axiosInstance from "../utils/axiosConfig.js";

export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/cart/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addItem = async (productId, talla, cantidad) => {
  try {
    const response = await axiosInstance.post("/cart/add", {
      id_snkr: productId,
      talla,
      cantidad,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const updateItemQuantity = async (productId, talla, cantidad) => {
  try {
    const response = await axiosInstance.put("/cart/update", {
      id_snkr: productId,
      talla,
      cantidad,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

export const removeItem = async (productId, talla) => {
  try {
    const response = await axiosInstance.delete("/cart/remove", {
      data: {
        id_snkr: productId,
        talla,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete("/cart/clear");
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
