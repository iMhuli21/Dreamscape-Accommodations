import { model, Schema, Types } from "mongoose";
import { Response, Request } from "express";

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  fullname: {
    required: true,
    type: String,
  },
  favouritePlaces: {
    required: true,
    type: Array<String>,
  },
  password: {
    required: true,
    type: String,
  },
  photo: {
    required: true,
    type: String,
  },
});

const userModel = model("Users", userSchema);

export default userModel;
