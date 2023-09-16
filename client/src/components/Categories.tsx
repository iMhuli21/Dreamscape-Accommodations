import axios from "axios";
import Category from "./Category";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  toast_options,
  userData,
  CategoriesData,
} from "../utilities/constants";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesData[]>([]);

  const getCategories = async () => {
    const user_data: userData = JSON.parse(localStorage.getItem("user") || "");

    try {
      const { data } = await axios("/categories", {
        headers: {
          Authorization: `Bearer ${user_data.token}`,
        },
      });

      setCategories(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="grid grid-flow-col overflow-scroll overflow-y-hidden gap-5">
      {categories?.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
}
