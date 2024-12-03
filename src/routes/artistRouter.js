import { Router } from "express";
import artistApiController from "../controller/artist/artistApiController.js";
import { isAuthenticated , isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", isAdmin, artistApiController.getAllArtists);

router.get("/:id", isAuthenticated, artistApiController.getArtistByUserId);

router.post("/new", isAuthenticated, artistApiController.createArtist);

router.post("/update", isAuthenticated, artistApiController.updateArtist);

router.post("/desactivate", isAuthenticated, artistApiController.desactivateArtist);

router.post("/activate", isAuthenticated, artistApiController.activateArtist);

export default router;
