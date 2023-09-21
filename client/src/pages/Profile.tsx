import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { AiFillPlusCircle } from "react-icons/ai";
import ProfileHeader from "../components/ProfileHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Places, toast_options, userData } from "../utilities/constants";
import Place from "../components/Place";

export default function Profile() {
  const [myplaces, setMyPlaces] = useState<Places[]>([]);

  const getMyPlaces = async () => {
    try {
      const user_data: userData = JSON.parse(localStorage.getItem("user")!);

      const { data } = await axios("/places/userPlaces", {
        headers: {
          Authorization: `Bearer ${user_data.token}`,
        },
      });

      setMyPlaces(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getMyPlaces();
  }, []);
  return (
    <div className="font-poppins relative">
      <ProfileHeader />
      <div className="mt-10">
        <h1 className="text-center">My Places</h1>
        <Link
          to={"/add-place"}
          className="flex items-center gap-2 text-blue-600 bg-gray-200 p-2 rounded-lg w-fit absolute right-3 top-[5.5rem] hover: cursor-pointer hover:opacity-90 transition-opacity duration-150"
        >
          <AiFillPlusCircle className="text-2xl" />
          <span>Add Place</span>
        </Link>
        <div className="grid w-full p-2 gap-2 gap-y-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {myplaces.map((item) => (
            <Place key={item._id} place={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
