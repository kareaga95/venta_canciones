import { Router } from "express";
import authApiController from "../controller/auth/authApiController.js";

const router = Router();

// router.get("/login", authViewController.loginForm);

// router.get("/register", authViewController.registerForm);

router.post("/login", authApiController.login);

router.post("/register", authApiController.register);

// router.get("/logout", authViewController.logout);

export default router;