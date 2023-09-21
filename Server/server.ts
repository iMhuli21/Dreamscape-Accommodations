import "dotenv/config";
import cors from "cors";
import path from "path";
import multer from "multer";
import { log } from "console";
import { connect } from "mongoose";
import userRoutes from "./Routes/User";
import { Auth } from "./Middleware/Auth";
import Logger from "./Middleware/Logger";
import express, { Request } from "express";
import placesRoutes from "./Routes/Places";
import categoriesRoutes from "./Routes/Categories";

const app = express();
const port = process.env.PORT!;
const dbUrl = process.env.MONGO_DB_URL;

const checkFiletype = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const mimeTypes = /webp|jpeg|jpg|gif|png/;

  const fileType = mimeTypes.test(file.mimetype);

  if (!fileType) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/uploads/"),
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void {
    let ext = `img-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, ext);
  },
});

export const upload = multer({
  storage,
  fileFilter: checkFiletype,
}).array("pictures", 10);

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(Logger);

//ROUTES
app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/places", placesRoutes);

connect(dbUrl!)
  .then(() => {
    log("Connected to DB");
  })
  .catch((error) => {
    log(`Error connecting to the DB because ${error.message}`);
  });

app.listen(port, async () => {
  log(`Server is up and running on PORT: ${port}`);
});
