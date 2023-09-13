import { model, Schema } from "mongoose";

const categoriesSchema = new Schema({
  category_name: {
    type: String,
    required: true,
    unique: true,
  },
  category_icon: {
    type: String,
    required: true,
  },
});

const categoryModel = model("Categories", categoriesSchema);

export default categoryModel;
