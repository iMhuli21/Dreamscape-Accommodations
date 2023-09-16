import { CategoriesData } from "../utilities/constants";

interface CategoryData {
  category: CategoriesData;
}

export default function Category({ category }: CategoryData) {
  return (
    <div className="flex flex-col items-center justify-center w-[5.2rem] px-4 font-poppins h-30 gap-1">
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
