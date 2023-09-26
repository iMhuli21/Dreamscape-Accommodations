import { model, Schema } from "mongoose";
import { data } from "../Controllers/placesController";

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  favouritePlaces: {
    required: true,
    type: Array<data>,
  },
  fullname: {
    required: true,
    type: String,
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
