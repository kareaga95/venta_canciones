    import { Router } from "express";
    import songApiController from "../controller/song/songApiController.js";
    import multerMiddleware from "../middlewares/multerMiddleware.js";
    import { isAuthenticated, songBelongsToUser } from "../middlewares/authMiddleware.js";

    const router = Router();

    router.get("/", songApiController.getAllSongs);

    router.get("/artist/:artistId", isAuthenticated, songApiController.getSongsByArtistId);

    router.get("/:id/download", isAuthenticated, songApiController.downloadSong);

    router.post("/new", isAuthenticated, multerMiddleware, songApiController.createSong);

    router.put("/:id/update", isAuthenticated, songBelongsToUser, songApiController.updateSong);

    router.delete("/:id/delete", isAuthenticated, songBelongsToUser, songApiController.deleteSong);

    router.get("/:id", songApiController.getSongById);

    export default router;