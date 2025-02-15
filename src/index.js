import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import session from "express-session";
import { saveUser } from "./middlewares/sessionMiddleware.js";
import cors from "cors"; // Cambiar require por import
import path from "path";
import paymentRouter from "./routes/paymentRouter.js";

dotenv.config();

const app = express();

// Configuración de CORS (debe ir antes de usar corsOptions)
const corsOptions = {
    origin: "http://localhost:5173", // Permitir solicitudes desde el frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permitir el uso de cookies y encabezados personalizados
};

app.use(cors(corsOptions)); // Habilitar CORS antes de usarlo

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json()); // Asegúrate de que este esté antes de las rutas de la API

const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/api/payment", paymentRouter); // Ruta para manejar pagos

app.get("/", (req, res) => res.send("hola mundo"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(saveUser); // Guardar la información del usuario en la sesión

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(3000, () => console.log("Estamos conectados en el puerto 3000"));
