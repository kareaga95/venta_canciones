import { Router } from "express";
import songApiController from "../controller/song/songApiController.js";
import multerMiddleware from "../middlewares/multerMiddleware.js";
import { isAuthenticated, songBelongsToUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", songApiController.getAllSongs);

router.get("/artist", isAuthenticated, songApiController.getSongsByArtistId);

router.post("/new", isAuthenticated, multerMiddleware, songApiController.createSong);

router.post("/:id/update", songBelongsToUser, multerMiddleware, songApiController.updateSong);

router.post("/:id/delete", isAuthenticated, songApiController.deleteSong);

router.get("/:id", multerMiddleware, songApiController.getSongById);

export default router;