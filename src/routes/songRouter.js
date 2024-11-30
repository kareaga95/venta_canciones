import { Router } from "express";
import songApiController from "../controller/song/songApiController.js";
import multerMiddleware from "../middlewares/multerMiddleware.js";

const router = Router();

router.get("/", songApiController.getAllSongs);
router.get("/artist/:artistId", songApiController.getSongsByArtistId);
router.post("/upload", multerMiddleware, songApiController.createSong);

export default router;