import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userModel from "../Models/User";
import { Response, Request } from "express";

//creates token
function createToken(id: Types.ObjectId) {
  return jwt.sign({ id }, process.env.SECRET!);
}

//Create user
export async function createUser(req: Request, res: Response) {
  try {
    //GRAB ALL THE FIELDS
    const { email, fullname, password } = req.body;
    const photo = "default/933-9332131_profile-picture-default-png.png";

    if (!email || !fullname || !password)
      throw new Error("All Fields are required");

    const emailValidator = /([\w\W]+@[\w]{4,5}.[\w]+)/;
    const passwordValidator = /([\w\W]{8,})/;
    const isValidEmail = emailValidator.test(email);
    const isValidPassword = passwordValidator.test(password);

    if (!isValidEmail) throw new Error("Invalid Email");

    if (!isValidPassword)
      throw new Error("Invalid Password, It must be more than 8 characters");

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
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
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("All fields are required");

    const emailValidator = /([\w\W]+@[\w]{4,5}.[\w]+)/;
    const passwordValidator = /([\w\W]{8,})/;
    const isValidEmail = emailValidator.test(email);
    const isValidPassword = passwordValidator.test(password);

    if (!isValidEmail) throw new Error("Invalid Email");

    if (!isValidPassword)
      throw new Error("Invalid Password, It must be more than 8 characters");

    const user = await userModel.findOne({ email: email });

    if (!user) throw new Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Incorrect Password");

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

    const user = await userModel
      .findById(_id)
      .select({ photo: 1, email: 1, fullname: 1 });

    if (!user) throw new Error("User does not exist");

    return res.status(200).json(user);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
