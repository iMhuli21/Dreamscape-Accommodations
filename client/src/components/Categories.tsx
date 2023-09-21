import axios from "axios";
import Category from "./Category";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { toast_options, CategoriesData } from "../utilities/constants";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesData[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axios("/categories");

      setCategories(data);
    } catch (error: any) {
      const { data } = error?.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="grid grid-flow-col px-2 items-center w-full overflow-scroll">
      {categories?.map((cat) => (
        <Category key={cat._id} category={cat} />
      ))}
    </div>
  );
}
