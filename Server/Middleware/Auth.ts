import jwt from "jsonwebtoken";
import userModel from "../Models/User";
import { Request, Response, NextFunction } from "express";

export async function Auth(req: Request, res: Response, next: NextFunction) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.SECRET!);

      if (!payload) {
        throw new Error("Invalid Token");
      } else {
        const id = (<any>payload).id;

        const user = await userModel.findOne({ _id: id });

        if (!user) throw new Error("User does not exist");

        (<any>req).user = user;

        next();
      }
    } catch (error: any) {
      const msg = error.message;
      res.status(400).json({ error: msg });
    }
  } else {
    res
      .status(401)
      .json({ error: "You are not authorized to access this resource" });
  }
}
