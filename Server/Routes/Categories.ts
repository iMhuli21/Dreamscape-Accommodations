import { Router } from "express";
import {
  addCategory,
  getCategories,
} from "../Controllers/categoriesController";

const router = Router();

router.get("/", getCategories);
router.post("/", addCategory);

export default router;
