import { Router } from "express";
import artistApiController from "../controller/artist/artistApiController.js";
import { isAuthenticated , isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", isAdmin, artistApiController.getAllArtists);

router.get("/artist/:id", artistApiController.getArtistById);

router.get("/:id", isAuthenticated, artistApiController.getArtistByUserId);

router.post("/new", isAuthenticated, artistApiController.createArtist);

router.put("/update", isAuthenticated, artistApiController.updateArtist);

router.patch("/status", isAuthenticated, artistApiController.updateArtistStatus);

export default router;
