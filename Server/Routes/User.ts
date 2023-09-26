import { Router } from "express";
import {
  updatePicture,
  createUser,
  loginUser,
  getInfo,
  myPhoto,
  addFavourite,
  updateFavourites,
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

//Get user Favs
router
  .route("/my-favourites")
  .get(Auth, getInfo)
  .post(Auth, addFavourite)
  .put(Auth, updateFavourites);

export default router;
