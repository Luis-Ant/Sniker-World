// Definirá las rutas de la API relacionadas con el registro y autenticacion de usuarios.
import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/verify", authController.verify);

export default router;
