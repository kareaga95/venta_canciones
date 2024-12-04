import { Router } from "express";
import userApiController from "../controller/user/userApiController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// router.get("/", isAdmin, userApiController.getAllUsers);
router.get("/", isAdmin, userApiController.getAllUsers);

router.post("/new", userApiController.createUser);

router.put("/:id/update", isAdmin, userApiController.updateUser);

router.post("/:id/desactivate", userApiController.desactivateUser);

router.post("/:id/activate", userApiController.activateUser);

router.patch("/status", isAuthenticated, userApiController.updateUserStatus);

router.get("/:id", userApiController.getUserById);

router.get("/email/:email", userApiController.getUserByEmail);

export default router;
