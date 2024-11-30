import multer from 'multer';
import { multerConfig } from "../config/multerConfig.js";

// Crear el middleware de Multer
const upload = multer(multerConfig).fields([
    { name: "coverImage", maxCount: 1 }, // Un archivo para la imagen
    { name: "audioFile", maxCount: 1 },  // Un archivo para el audio
]);

export default upload;
