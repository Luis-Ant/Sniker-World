// Middleware para verificar si el usuario está autenticado (basado en el accessToken en la cookie).
import jwt from "jsonwebtoken";
import db from "../config/database.js";
const { Usuario } = db;

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. No se proporcionó token." });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await Usuario.findByPk(decoded.id_usr);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Acceso no autorizado. Token inválido." });
    }

    req.user = user; // Adjuntar la información del usuario al objeto de la petición
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. Token inválido o expirado." });
  }
};

export default authMiddleware;
