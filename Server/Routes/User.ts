import { Router } from "express";
import {
  updatePicture,
  createUser,
  loginUser,
  myPhoto,
} from "../Controllers/userController";
import { Auth } from "../Middleware/Auth";

const router = Router();

//Create Sser Route
router.post("/signup", createUser);

//Login User Route
router.post("/login", loginUser);

//Update User Profile Photo
router.put("/update-photo", Auth, updatePicture);

//Get user photo
router.get("/my-photo", Auth, myPhoto);

export default router;
