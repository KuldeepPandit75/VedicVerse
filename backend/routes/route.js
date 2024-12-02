import express from "express";
import { LoginUser, SignupUser } from "../controller/user-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

// Route for Signup & Login

router.post("/signup",SignupUser);
router.post("/login",LoginUser);

export default router;