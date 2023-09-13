import { log } from "console";
import { Response, Request, NextFunction } from "express";

export default function Logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log(req.method, req.url);

  next();
}
