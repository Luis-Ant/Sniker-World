import axiosInstance from "../utils/axiosConfig.js";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    // Manejo detallado de errores
    if (error.response) {
      const { status, data } = error.response;
      // Errores de validación o datos incorrectos
      if (status === 400) {
        throw new Error(data.error || "Invalid registration data.");
      }
      // Otros errores del servidor
      console.error("Error en el servidor durante el registro:", data);
      throw new Error(
        data.error ||
          "Server error during registration. Please try again later."
      );
    }
    // No hubo respuesta del servidor
    if (error.request) {
      console.error(
        "No se recibió respuesta del servidor durante el registro:",
        error.request
      );
      throw new Error(
        "Unable to connect to the server for registration. Please check your connection."
      );
    }
    // Otros errores de JS
    console.error("Error desconocido durante el registro:", error.message);
    throw new Error(
      "An unexpected error occurred during registration. Please try again."
    );
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      correo_usr: email,
      contrasena_usr: password,
    });
    const { user, ...rest } = response.data;
    return { ...user, ...rest };
  } catch (error) {
    // Manejo detallado de errores
    if (error.response) {
      const { status, data } = error.response;
      // Credenciales incorrectas
      if (status === 400 || status === 401) {
        throw new Error(data.message || "Incorrect email or password.");
      }
      // Otros errores del servidor
      console.error("Error en el servidor:", data);
      throw new Error(data.message || "Server error. Please try again later.");
    }
    // No hubo respuesta del servidor
    if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error(
        "Unable to connect to the server. Please check your connection."
      );
    }
    // Otros errores de JS
    console.error("Error desconocido:", error.message);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error("Failed to logout. Please try again.");
  }
};

export const verifyToken = async () => {
  const response = await axiosInstance.get("/auth/verify");
  return response.data; // Retornar los datos del usuario verificado
};
