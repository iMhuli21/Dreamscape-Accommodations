import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimeFive } from "react-icons/bi";
import { Places, toast_options } from "../utilities/constants";
import { BsPerson, BsCashCoin, BsTelephoneFill } from "react-icons/bs";

export default function PlaceInfo() {
  const { id } = useParams();
  const [place, setPlace] = useState<Places | null>(null);

  const getPlace = async () => {
    try {
      const { data } = await axios(`/places/${id}`);

      setPlace(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getPlace();
  }, []);
  return (
    <div className="font-poppins">
      <Header />
      {place && (
        <div className="w-full flex flex-col mx-auto gap-2 overflow-y-scroll p-2 sm:w-8/12 lg:w-6/12">
          <h1 className="text-center font-permanent text-neutral-500 mt-10 text-xl">
            {place.name}
          </h1>
          <div className="px-5">
            <Carousel place={place} />
          </div>
          <div className="px-5 text-neutral-700 text-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaLocationDot />
                <span className="">{place.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <BsPerson />
                <span>{place.max_guests} Max guests</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BiSolidTimeFive />
                <span>{place.check_in_time}</span>
                <span>Check In</span>
              </div>
              <div className="flex items-center gap-2">
                <BiSolidTimeFive />
                <span>{place.check_out_time}</span>
                <span>Check Out</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BsTelephoneFill />
                <span>{place.contact_details}</span>
              </div>
              <div className="flex items-center gap-2">
                <BsCashCoin />
                <span>R {place.cost.toFixed(2)} per night</span>
              </div>
            </div>
            <div className="flex items-start flex-col mt-3">
              <h3>Amenities</h3>
              <div className="flex gap-5 w-full flex-wrap mt-3">
                {place.amenities.map((amenity) => (
                  <span className="amenity-2" key={amenity}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <button className="p-2 rounded text-white bg-gradient-to-r from-red-600 to-red-700/100">
              Book Accommodation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
