import { Request, Response } from "express";
import categoryModel from "../Models/Categories";

export async function addCategory(req: Request, res: Response) {
  const { name, icon } = req.body;

  if (!name || !icon)
    return res.status(400).json({ Errmsg: "All Fields are required" });

  try {
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
    const categories = await categoryModel.find();

    res.status(200).json(categories);
  } catch (error: any) {
    const Errmsg = error.message;
    res.status(400).json({ Errmsg });
  }
}
