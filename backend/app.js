import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes desde este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡El servidor está funcionando!");
});

export default app;
