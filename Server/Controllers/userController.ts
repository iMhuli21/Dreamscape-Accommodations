import bcrypt from "bcrypt";
import { log } from "console";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { upload } from "../server";
import userModel from "../Models/User";
import { Response, Request } from "express";

//creates token
function createToken(id: Types.ObjectId) {
  return jwt.sign({ id }, process.env.SECRET!);
}

//Create user
export async function createUser(req: Request, res: Response) {
  //GRAB ALL THE FIELDS
  const { email, fullname, password } = req.body;
  const photo = "default/933-9332131_profile-picture-default-png.png";
  const favouritePlaces: string[] = [];

  if (!email || !fullname || !password)
    return res.status(400).json({ error: "All Fields are required" });

  const emailValidator = /([\w\W]+@[\w]{4,5}.[\w]+)/;
  const passwordValidator = /([\w\W]{8,})/;
  const isValidEmail = emailValidator.test(email);
  const isValidPassword = passwordValidator.test(password);

  if (!isValidEmail) return res.status(400).json({ error: "Invalid Email" });

  if (!isValidPassword)
    return res
      .status(400)
      .json({ error: "Invalid Password, It must be more than 8 characters" });

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      favouritePlaces,
      fullname,
      password: hashedPassword,
      photo,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

//Login User
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(200).json({ error: "All fields are required" });

  const emailValidator = /([\w\W]+@[\w]{4,5}.[\w]+)/;
  const passwordValidator = /([\w\W]{8,})/;
  const isValidEmail = emailValidator.test(email);
  const isValidPassword = passwordValidator.test(password);

  if (!isValidEmail) return res.status(400).json({ error: "Invalid Email" });

  if (!isValidPassword)
    return res
      .status(400)
      .json({ error: "Invalid Password, It must be more than 8 characters" });

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });

    return res.status(200).json({
      username: user.fullname,
      token: createToken(user._id),
    });
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

//Get user Information
export async function aboutMe(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    const user = await userModel.findById(_id);

    if (!user) return res.status(404).json({ error: "User does not exist" });

    return res.status(200).json(user);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
