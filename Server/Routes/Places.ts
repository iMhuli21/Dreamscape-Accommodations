import { Router } from "express";
import { Auth } from "../Middleware/Auth";
import {
  addNewPlace,
  deletePlace,
  getPlaces,
  getPlacesWithCategory,
  getPlacesWithRange,
  updatePlace,
  updatePhotos,
  getPlaceById,
  addPhotos,
  userPlaces,
} from "../Controllers/placesController";

const router = Router();

//gets all places - check
router.get("/", getPlaces);

//gets the currently logged in users added places - check
router.get("/userPlaces", Auth, userPlaces);

//adding new Place - check
router.post("/", Auth, addNewPlace);

//gets the place by the id - check
router.get("/:id", getPlaceById);

//update photos - check
router.post("/update-photos/:id", Auth, updatePhotos);

//add photos to currently existing place
router.patch("/add-photos/:id", Auth, addPhotos);

//updates user place information - check
router.put("/:id", Auth, updatePlace);

//deletes place
router.delete("/:id", Auth, deletePlace);

//gets places by the category - check
router.get("/category/:category", getPlacesWithCategory);

//gets places by the price range - check
router.get("/price-range/:range", getPlacesWithRange);

export default router;
