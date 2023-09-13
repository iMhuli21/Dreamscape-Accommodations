import { Router } from "express";
import { aboutMe, createUser, loginUser } from "../Controllers/userController";
import { Auth } from "../Middleware/Auth";

const router = Router();

//Create Sser Route
router.post("/signup", createUser);

//Login User Route
router.post("/login", loginUser);

//Get user Information
router.get("/about-me", Auth, aboutMe);

export default router;
