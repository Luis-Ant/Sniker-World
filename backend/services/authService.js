// Manejar las peticiones http de los usuarios.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
const { Usuario } = db;

const authService = {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.contrasena_usr, 10);
    return Usuario.create({ ...userData, contrasena_usr: hashedPassword });
  },

  async login(correo_usr, contrasena_usr) {
    const userInstance = await Usuario.findOne({ where: { correo_usr } });
    if (!userInstance) throw new Error("Credenciales incorrectas");

    const isPasswordValid = await bcrypt.compare(
      contrasena_usr,
      userInstance.contrasena_usr
    );
    if (!isPasswordValid) throw new Error("Credenciales incorrectas");

    const user = userInstance.toJSON();
    delete user.password; // Eliminar la contraseña del objeto de usuario

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, user };
  },

  verifyToken(accessToken) {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  },
};

export default authService;
