// Manejará la lógica de autenticacion de los usuraios.
import authService from "../services/authService.js";

const authController = {
  // Metodo para registrar usuario nuevo
  async register(req, res) {
    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({
        message: "Usuario registrado exitosamente.",
        userId: newUser.id_usr,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Metodo para iniciar sesion.
  async login(req, res) {
    try {
      const { correo_usr, contrasena_usr } = req.body;
      const { accessToken, userId } = await authService.login(
        correo_usr,
        contrasena_usr
      );

      // Almacenar el token en una cookie HTTP-only
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      res.status(200).json({ message: "Inicio de sesión exitoso.", userId });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie("accessToken");
      res.status(200).json({ message: "Sesión cerrada con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  },

  async verify(req, res) {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }
      const decoded = authService.verifyToken(accessToken);
      res.status(200).json({ decoded });
    } catch (error) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  },
};

export default authController;
