import { CategoriesData } from "../utilities/constants";
import { useNavigate } from "react-router-dom";

interface CategoryData {
  category: CategoriesData;
}

export default function Category({ category }: CategoryData) {
  const navigate = useNavigate();
  const handleCategory = (name: string) => {
    navigate(`/category/${name}`);
  };
  return (
    <div
      className="flex flex-col items-center justify-center w-[5.2rem] px-4 font-poppins h-30 gap-1 hover:cursor-pointer"
      onClick={() => handleCategory(category.category_name)}
    >
      <img
        src={`${import.meta.env.VITE_BACKEND_SERVER}/${category.category_icon}`}
        alt="icon"
        className="w-9/12"
      />
      <span className="text-center text-neutral-500 text-xs">
        {category.category_name}
      </span>
    </div>
  );
}
