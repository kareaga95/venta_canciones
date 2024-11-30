import multer from "multer";
import path from "path";

// Configuración del almacenamiento para imágenes y audios
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "coverImage") {
            cb(null, "uploads/images"); // Carpeta para imágenes
        } else if (file.fieldname === "audioFile") {
            cb(null, "uploads/audios"); // Carpeta para audios
        } else {
            cb(new Error("Campo de archivo no válido"));
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Obtiene la extensión del archivo
        cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Nombre único para el archivo
    },
});

// Filtro de archivos para validar los tipos permitidos
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "coverImage" && file.mimetype.startsWith("image/")) {
        cb(null, true); // Aceptar imágenes
    } else if (file.fieldname === "audioFile" && file.mimetype.startsWith("audio/")) {
        cb(null, true); // Aceptar audios
    } else {
        cb(new Error("Tipo de archivo no permitido"), false); // Rechazar archivo
    }
};

// Exporta la configuración de almacenamiento y filtro
export const multerConfig = {
    storage,
    fileFilter,
    limits: { fileSize: 30 * 1024 * 1024 }, // Límite de 10 MB por archivo
};
