import { ToastOptions } from "react-toastify";

export const toast_options: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export interface userData {
  username: string;
  token: string;
}

export interface CategoriesData {
  category_icon: string;
  category_name: string;
  __v: number;
  _id: string;
}

export interface User {
  email: string;
  fullname: string;
  photo: string;
  _id: string;
}

export interface Places {
  amenities: string[];
  categories: string[];
  check_in_time: string;
  check_out_time: string;
  contact_details: string;
  cost: number;
  createdAt: string;
  location: string;
  max_guests: number;
  name: string;
  owner: string;
  photos: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}
