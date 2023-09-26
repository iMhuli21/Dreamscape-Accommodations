import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { upload } from "../server";
import userModel from "../Models/User";
import { Response, Request } from "express";
import { data } from "./placesController";

interface place {
  place: data;
}

//creates token
function createToken(id: Types.ObjectId) {
  return jwt.sign({ id }, process.env.SECRET!);
}

//Create user
export async function createUser(req: Request, res: Response) {
  try {
    //GRAB ALL THE FIELDS
    const favouritePlaces: data[] = [];
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
export async function updatePicture(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    upload(req, res, async (err) => {
      //uploads the pictures
      const uploadedFiles = req.files as Express.Multer.File[];

      if (uploadedFiles.length === 0)
        throw new Error("Image Format not allowed");

      //just getting the filename of the file and append the dest of the image
      let newPhoto = "uploads/" + uploadedFiles[0].filename;

      //we can now update the photos
      const updateUser = await userModel.findByIdAndUpdate(_id, {
        photo: newPhoto,
      });

      return res.status(200).json(updateUser);
    });
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

export async function myPhoto(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    const userPhoto = await userModel.findById(_id);

    return res.status(200).json(userPhoto);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

export async function addFavourite(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    const { place }: place = req.body;

    let favourites: data[] = [];

    const prevInfo = await userModel.findById(_id);

    if (prevInfo) {
      if (prevInfo.favouritePlaces) {
        //upload the previous places that are still saved
        for (const key in prevInfo.favouritePlaces) {
          if (place.name !== (<any>prevInfo).favouritePlaces[key].name) {
            favourites.push((<any>prevInfo).favouritePlaces[key]);
          }
        }
      }

      favourites.push(place);

      const updateFav = await userModel.findByIdAndUpdate(_id, {
        favouritePlaces: favourites,
      });

      return res.status(200).json({ success: "Successfully updated" });
    }
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

export async function updateFavourites(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;
    const { favouritePlaces } = req.body;

    const updateFav = await userModel.findByIdAndUpdate(_id, {
      favouritePlaces,
    });

    return res.status(200).json({ success: "Successfully updated" });
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

export async function getInfo(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    const user = await userModel.findById(_id).select({ favouritePlaces: 1 });

    return res.status(200).json(user);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
