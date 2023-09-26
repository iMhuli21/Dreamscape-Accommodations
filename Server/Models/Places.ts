import { model, Schema, Types } from "mongoose";

const placesSchema = new Schema(
  {
    amenities: {
      type: Array<String>,
      required: true,
    },
    categories: {
      type: Array<String>,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    contact_details: {
      type: String,
      required: true,
    },
    check_in_time: {
      type: String,
      required: true,
    },
    check_out_time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    max_guests: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photos: {
      type: Array<String>,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const placesModel = model("Places", placesSchema);

export default placesModel;
