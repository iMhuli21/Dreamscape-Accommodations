import axios from "axios";
import Logo from "../assets/6090058_bed_rent_room_icon.svg";
import useNavContext from "../hooks/useNavContext";
import { LuMenu } from "react-icons/lu";
import SideNav from "../components/SideNav";
import { Link } from "react-router-dom";
import { Places, toast_options } from "../utilities/constants";
import { toast } from "react-toastify";
import { useState } from "react";
import Place from "../components/Place";
import { BsSearch } from "react-icons/bs";
import capitilizeWord from "../utilities/Capitilize";

export default function Search() {
  const { setShowMenu } = useNavContext();
  const [option, setOption] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [places, setPlaces] = useState<Places[]>([]);

  const handleOption = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const getPlaces = async () => {
    try {
      if (option === "price-range") {
        const { data } = await axios(`/places/price-range/${Number(value)}`);

        setPlaces(data);
      } else if (option === "category") {
        const { data } = await axios(
          `/places/category/${capitilizeWord(value)}`
        );

        setPlaces(data);
      }
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-8 border-b w-full font-permanent py-2">
        <LuMenu
          className="text-2xl hover:cursor-pointer text-neutral-700"
          onClick={() => setShowMenu(true)}
        />
        <SideNav />
        <Link to={"/"} className="flex items-center gap-3 hover:cursor-pointer">
          <img src={Logo} alt="logo" className="w-20" />
          <span className="text-xl text-neutral-600">
            DreamScape Accommodations
          </span>
        </Link>
      </div>

      <div className="font-poppins px-2">
        <h1 className="font-permanent text-neutral-500 text-center mt-10 text-lg">
          Search for a place based on your option
        </h1>
        <div className="flex items-center mt-4 w-full justify-center">
          <div className="flex items-center border border-r-0 border-gray-400 gap-1">
            <select
              name="menu-option"
              id="menu-option"
              className="border-none text-neutral-500"
              onChange={handleOption}
            >
              <option value="select-option">Select Option</option>
              <option value="category">category</option>
              <option value="price-range">price range</option>
            </select>
            <input
              type="text"
              name="value"
              id="value"
              placeholder="Enter a Value..."
              className="border-none capitalize text-neutral-600 font-medium"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div
            className="flex items-center justify-center border p-[0.7rem] bg-gradient-to-tr from-blue-700 to-blue-600 text-white rounded-r hover:cursor-pointer hover:opacity-80 transition-opacity duration-150"
            onClick={getPlaces}
          >
            <BsSearch className="text-xl" />
          </div>
        </div>
        <div className="grid w-full p-2 gap-2 gap-y-5 mt-10 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {places.map((item) => (
            <Place key={item._id} place={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
