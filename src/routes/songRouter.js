import { Router } from "express";
import songController from "../controller/songController.js";

const router = Router();

router.get("/", songController.getAll);
router.get("/artist/:artistId", songController.getAllByArtistId);

export default router;