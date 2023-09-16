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

export interface ProfileData {
  email: string;
  fullname: string;
  photo: string;
  _id: string;
}
