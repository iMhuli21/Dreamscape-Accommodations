import { upload } from "../server";
import placesModel from "../Models/Places";
import { Request, Response } from "express";

interface data {
  categories: Array<string>;
  cost: Number;
  contact_details: String;
  check_in_time: String;
  check_out_time: String;
  location: String;
  max_guests: Number;
  name: String;
}

//ADD NEW PLACE
export async function addNewPlace(req: Request, res: Response) {
  upload(req, res, async (err) => {
    try {
      //getting fields from the form
      const {
        categories,
        cost,
        contact_details,
        check_in_time,
        check_out_time,
        location,
        max_guests,
        name,
      }: data = req.body;

      //user id of the person adding the place
      const { _id } = (<any>req).user;
      const files = req.files as Express.Multer.File[];

      if (files.length === 0)
        return res.status(400).json({ error: "Image Format not allowed" });

      //contains the path of the images that have been uploaded of the place
      let uploadedPictures: string[] = [];

      //checking if the fields are empty
      if (
        !categories ||
        !cost ||
        !contact_details ||
        !check_in_time ||
        !check_out_time ||
        !location ||
        !max_guests ||
        !name
      )
        return res.json({ Errmsg: "All fields are required" });

      //just getting the filenames of each file and append the dest of the image
      files.forEach((file) => {
        let myFile = "uploads/" + file.filename;
        uploadedPictures.push(myFile);
      });

      //creating the place in mongoDB
      const newPlace = await placesModel.create({
        categories,
        check_in_time,
        check_out_time,
        contact_details,
        cost,
        location,
        max_guests,
        name,
        photos: uploadedPictures,
        owner: _id,
      });

      return res.status(200).json(newPlace);
    } catch (error: any) {
      const msg = error.message;
      return res.status(400).json({ error: msg });
    }
  });
}
//DELETE PLACE
export async function deletePlace(req: Request, res: Response) {
  try {
    //place id
    const { id } = req.params;

    //user id - only authenticated users can delete places
    const { _id } = (<any>req).user;

    //first thing to check if the authenticate user owns the house
    const ownsHouse = await placesModel.find({ owner: _id, _id: id });

    if (ownsHouse.length === 0)
      return res.status(401).json({
        error:
          "You are not authorized to delete this place. You can only delete places you own.",
      });

    //delete the place
    const deleteItem = await placesModel.findByIdAndDelete(id);

    if (!deleteItem)
      return res.status(404).json({ error: "Place does not exist" });

    return res
      .status(200)
      .json({ success: "Item has been deleted", deletedItem: deleteItem });
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
//GET ALL PLACES
export async function getPlaces(req: Request, res: Response) {
  try {
    const places = await placesModel.find();

    if (places.length === 0)
      return res.status(404).json({ error: "No places" });

    return res.status(200).json(places);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
//GET ALL PLACES WITH CATEGORY
export async function getPlacesWithCategory(req: Request, res: Response) {
  try {
    const { category } = req.params;

    const searchPlace = await placesModel.find({
      categories: { $in: [category] },
    });

    if (searchPlace.length === 0)
      return res
        .status(404)
        .json({ error: `Failed to find places with ${category} category` });

    return res.status(200).json(searchPlace);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
//GET ALL PLACES WITH PRICE RANGE
export async function getPlacesWithRange(req: Request, res: Response) {
  try {
    const { range } = req.params;

    const searchPlace = await placesModel.find({
      cost: range,
    });

    if (searchPlace.length === 0)
      return res
        .status(404)
        .json({ error: `Failed to find places with R ${range} price range` });

    return res.status(200).json(searchPlace);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
//UPDATES PLACE - updates the information not the images
export async function updatePlace(req: Request, res: Response) {
  try {
    //place id
    const { id } = req.params;

    //authenticate user id
    const { _id } = (<any>req).user;

    const ownsHouse = await placesModel.findOne({ owner: _id, _id: id });

    if (!ownsHouse)
      return res
        .status(401)
        .json({ error: "You do not own this house cannot make changes" });

    const updatePlaceInfo = await placesModel.findByIdAndUpdate(id, req.body);

    return res.status(200).json(updatePlaceInfo);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

//get place by id
export async function getPlaceById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const place = await placesModel.findById(id);

    if (!place) return res.status(404).json({ error: "Place not found" });

    return res.status(200).json(place);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

//update photos
export async function updatePhotos(req: Request, res: Response) {
  try {
    //place id
    const { id } = req.params;

    const { photos } = req.body;

    //authenticate user id
    const { _id } = (<any>req).user;

    const ownsHouse = await placesModel.findOne({ owner: _id, _id: id });

    if (!ownsHouse)
      return res
        .status(401)
        .json({ error: "You do not own this house cannot make changes" });

    const updatePlacePhotos = await placesModel.findByIdAndUpdate(id, {
      photos,
    });

    return res.status(200).json(updatePlacePhotos);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}

//add new photos
export async function addPhotos(req: Request, res: Response) {
  upload(req, res, async (err) => {
    try {
      //uploads the pictures
      const uploadedFiles = req.files as Express.Multer.File[];

      if (uploadedFiles.length === 0)
        return res.status(400).json({ error: "Image Format not allowed" });

      //place id
      const { id } = req.params;

      //authenticated user id
      const { _id } = (<any>req).user;

      //checking if the person owns the house
      const ownsHouse = await placesModel.findOne({ owner: _id, _id: id });

      if (!ownsHouse)
        return res
          .status(401)
          .json({ error: "You do not own this house cannot make changes" });

      //contains the path of the images that have been uploaded of the place
      let newPictures: string[] = [];

      //just getting the filenames of each file and append the dest of the image
      uploadedFiles?.forEach((file) => {
        let myFile = "uploads/" + file.filename;
        newPictures.push(myFile);
      });

      //upload the previous images that are still saved
      for (const key in ownsHouse.photos) {
        newPictures.push((<any>ownsHouse).photos[key]);
      }

      //we can now update the photos
      const updatePlace = await placesModel.findByIdAndUpdate(id, {
        photos: newPictures,
      });

      return res.status(200).json(updatePlace);
    } catch (error: any) {
      const msg = error.message;
      return res.status(400).json({ error: msg });
    }
  });
}

export async function userPlaces(req: Request, res: Response) {
  try {
    const { _id } = (<any>req).user;

    const myplaces = await placesModel.find({ owner: _id });

    if (myplaces.length === 0)
      return res.status(200).json({ info: "No places..." });

    return res.status(200).json(myplaces);
  } catch (error: any) {
    const msg = error.message;
    return res.status(400).json({ error: msg });
  }
}
