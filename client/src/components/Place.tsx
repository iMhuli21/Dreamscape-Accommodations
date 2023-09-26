import { Places, toast_options, userData } from "../utilities/constants";
import { Carousel } from "flowbite-react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

interface Props {
  place: Places;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  page?: string;
}

export default function Place({ place, onClick, page }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/place/${place._id}`);
  };
  const addFavorite = async () => {
    try {
      const user_data: userData = JSON.parse(localStorage.getItem("user")!);
      const { data } = await axios.post(
        "/users/my-favourites",
        {
          place,
        },
        {
          headers: {
            Authorization: `Bearer ${user_data.token}`,
          },
        }
      );
      toast.success(data.success, toast_options);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };
  return (
    <div className="w-7/12 border mx-auto h-[21.5rem] overflow-hidden rounded-xl relative text-neutral-900 shadow sm:w-10/12 md:w-8/12">
      <Carousel>
        {place.photos.map((pic) => (
          <img
            key={place._id}
            src={`${import.meta.env.VITE_BACKEND_SERVER}/${pic}`}
            alt="picture of accommodation"
            className="w-full absolute top-28 h-60 object-cover object-center"
            onClick={handleClick}
          />
        ))}
      </Carousel>
      <div className="absolute bottom-3 flex items-start justify-between w-full">
        <div className="text-sm text-neutral-700 flex flex-col items-start p-2">
          <span className="text-base">{place.name}</span>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <span className="">{place.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <BsCashCoin />
            <span>R {place.cost.toFixed(2)} per night</span>
          </div>
        </div>
        <div className="p-2 flex items-center gap-2">
          <div onClick={addFavorite}>
            <AiOutlineHeart className="text-2xl hover:cursor-pointer hover:text-red-900" />
          </div>
          <div onClick={onClick} className={!page ? "hidden" : "flex"}>
            <BsTrash className="text-xl hover:cursor-pointer hover:text-red-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
