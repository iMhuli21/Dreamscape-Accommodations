import { Request, Response } from "express";
import categoryModel from "../Models/Categories";

export async function addCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) throw new Error("All Fields are required");

    const category = await categoryModel.create({
      category_name: name,
      category_icon: icon,
    });

    return res.status(200).json(category);
  } catch (error: any) {
    const Errmsg = error.message;
    res.status(400).json({ Errmsg });
  }
}

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoryModel.find().sort({ category_name: 1 });

    res.status(200).json(categories);
  } catch (error: any) {
    const Errmsg = error.message;
    res.status(400).json({ Errmsg });
  }
}
