"use client";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { toast_options, userData } from "../utilities/constants";

export default function AddPlace() {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [cost, setCost] = useState<string>("");
  const [contact_details, setContactDetails] = useState<string>("");
  const [check_in_time, setCheckInTime] = useState<string>("");
  const [check_out_time, setCheckOutTime] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [max_guest, setMaxGuest] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [files, setFiles] = useState<FileList>();

  const addAmenity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const amenity = e.target.value;

    if (amenity !== "select-option") {
      if (amenities.length === 0) {
        setAmenities([amenity]);
      } else {
        const exists = amenities.some((item) => item === amenity);

        if (!exists) {
          setAmenities((prev) => [...prev, amenity]);
        }
      }
    }
  };

  const addCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    if (category !== "select-option") {
      if (categories.length === 0) {
        setCategories([category]);
      } else {
        const exists = categories.some((item) => item === category);

        if (!exists) {
          setCategories((prev) => [...prev, category]);
        }
      }
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((item) => item !== category));
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter((item) => item !== amenity));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let formData = new FormData();
    const user_data: userData = JSON.parse(localStorage.getItem("user")!);

    categories.forEach((item) => {
      formData.append("categories", item);
    });

    amenities.forEach((item) => {
      formData.append("amenities", item);
    });

    for (const obj of files!) {
      formData.append("pictures", obj);
    }
    formData.append("cost", cost);
    formData.append("contact_details", contact_details);
    formData.append("check_in_time", check_in_time);
    formData.append("check_out_time", check_out_time);
    formData.append("location", location);
    formData.append("max_guests", max_guest);
    formData.append("name", name);

    try {
      await axios.post("/places", formData, {
        headers: {
          Authorization: `Bearer ${user_data.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Successfully create a new place", toast_options);
      navigate("/profile");
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };
  return (
    <div className="font-poppins grid grid-flow-row">
      <Header />
      <div className="mt-10 flex flex-col gap-2">
        <h1 className="text-center">Add Your Place</h1>
        <form
          className="px-5 text-neutral-800 flex flex-col items-start gap-5 p-2 sm:w-9/12 mx-auto lg:w-7/12 xl:w-6/12"
          id="add-place-form"
        >
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="name" className="text-lg tracking-wide">
              Title
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Title for your place should be short and catchy as in
              advertisement
            </span>
            <input
              type="text"
              name="name"
              id="name"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="amenities" className="text-lg tracking-wide">
              Amenities
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Select as many ones that apply to your accommodation.
            </span>
            <div className="flex gap-5 w-full flex-wrap mt-3">
              {amenities.length !== 0 &&
                amenities.map((amenity) => (
                  <span
                    className="amenity"
                    key={amenity}
                    onClick={() => removeAmenity(amenity)}
                  >
                    {amenity}
                  </span>
                ))}
            </div>

            <select
              name="amenities"
              id="amenities"
              onChange={addAmenity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
            >
              <option value={"select-option"}>Select Option</option>
              <option value={"Air Conditioning"}>Air Conditioning</option>
              <option value={"Bath Tub"}>Bath Tub</option>
              <option value={"Balcony"}>Balcony</option>
              <option value={"Carport"}>Carport</option>
              <option value={"Gym"}>Gym</option>
              <option value={"Refridgerator"}>Refridgerator</option>
              <option value={"Kitchen"}>Kitchen</option>
              <option value={"Pool"}>Pool</option>
              <option value="TV">TV</option>
              <option value="Washer">Washer</option>
              <option value="WI-FI">WI-FI</option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="cost" className="text-lg tracking-wide">
              Cost
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Cost per night of the accommodation in Rands
            </span>
            <input
              type="number"
              name="cost"
              id="cost"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="check_in_time" className="text-lg tracking-wide">
              Check In Time
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Check In Time for the accommodation
            </span>
            <input
              type="time"
              name="check_in_time"
              id="check_in_time"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={check_in_time}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="check_out_time" className="text-lg tracking-wide">
              Check Out Time
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Check Out Time for the accommodation
            </span>
            <input
              type="time"
              name="check_out_time"
              id="check_out_time"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={check_out_time}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="contact_details" className="text-lg tracking-wide">
              Contact Details
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Contact Details for the owner or receptionist of the accommodation
            </span>
            <input
              type="text"
              name="contact_details"
              id="contact_details"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={contact_details}
              onChange={(e) => setContactDetails(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="max_guest" className="text-lg tracking-wide">
              Max Guests
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Maximum number of guests the accommodation can accommodate
            </span>
            <input
              type="number"
              name="max_guest"
              id="max_guest"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={max_guest}
              onChange={(e) => setMaxGuest(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="location" className="text-lg tracking-wide">
              Location
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Location of the accommodation
            </span>
            <input
              type="text"
              name="location"
              id="location"
              className="rounded-lg bg-gray-50 border border-gray-300 w-full focus:border-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="categories" className="text-lg tracking-wide">
              Categories
            </label>
            <span className="text-sm text-neutral-400 tracking-tighter">
              Select as many ones that apply to your accommodation.
            </span>
            <div className="flex gap-5 w-full flex-wrap mt-3">
              {categories.length !== 0 &&
                categories.map((category) => (
                  <span
                    className="cat"
                    key={category}
                    onClick={() => removeCategory(category)}
                  >
                    {category}
                  </span>
                ))}
            </div>

            <select
              name="categories"
              id="categories"
              onChange={addCategory}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
            >
              <option value={"select-option"}>Select Option</option>
              <option value={"Amazing Pools"}>Amazing Pools</option>
              <option value={"Amazing Views"}>Amazing Views</option>
              <option value={"Beachfront"}>Beachfront</option>
              <option value={"Bed & Breakfasts"}>Bed & Breakfasts</option>
              <option value={"Cabins"}>Cabins</option>
              <option value={"Camping"}>Camping</option>
              <option value={"Countryside"}>Countryside</option>
              <option value={"Farms"}>Farms</option>
              <option value={"National Parks"}>National Parks</option>
            </select>
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="pictures"
                value="Upload file"
                className="text-lg tracking-wide"
              />
            </div>
            <FileInput
              helperText="More pictures = better. Only supported image formats are webp, jpeg, jpg, gif, png.*"
              id="pictures"
              multiple
              onChange={handleUpload}
            />
          </div>

          <button
            className="border p-2 rounded-lg bg-gray-800 text-white mx-auto w-6/12 hover:opacity-90 transition-opacity duration-200"
            onClick={handleSubmit}
          >
            Add Place
          </button>
        </form>
      </div>
    </div>
  );
}
