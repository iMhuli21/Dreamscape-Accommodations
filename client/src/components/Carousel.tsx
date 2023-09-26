import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Places } from "../utilities/constants";

interface Props {
  place: Places;
}

export default function Carousel({ place }: Props) {
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((prev) => (prev === 0 ? place?.photos.length! - 1 : curr - 1));
  const next = () =>
    setCurr((prev) => (prev === place?.photos.length! - 1 ? 0 : curr + 1));

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {place.photos.map((item, i) => (
          <img
            key={i}
            src={`${import.meta.env.VITE_BACKEND_SERVER}/${item}`}
            alt="picture of accommodation"
            className="object-cover object-center brightness-90"
          />
        ))}
      </div>
      <div className="absolute flex items-center inset-0 justify-between text-white px-3">
        <div
          className="p-2 hover:cursor-pointer bg-light-bg rounded-full"
          onClick={prev}
        >
          <BsChevronLeft className="text-2xl" />
        </div>
        <div
          className="p-2 hover:cursor-pointer bg-light-bg rounded-full"
          onClick={next}
        >
          <BsChevronRight className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
