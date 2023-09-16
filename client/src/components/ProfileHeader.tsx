import axios from "axios";
import { toast } from "react-toastify";
import { LuMenu, LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast_options, userData, ProfileData } from "../utilities/constants";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user_data, setUserData] = useState<ProfileData | null>(null);

  const getUserInfo = async () => {
    try {
      const user_data: userData = JSON.parse(
        localStorage.getItem("user") || ""
      );

      const { data } = await axios("/users/about-me", {
        headers: {
          Authorization: `Bearer ${user_data.token}`,
        },
      });

      setUserData(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="flex items-center">
      <div className="side p-2">
        <LuMenu
          className="text-2xl hover:cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        <div
          className={
            showMenu
              ? " bg-white fixed left-0 top-0 w-5/12 h-full z-10 border-r"
              : "hidden"
          }
        >
          {/*CLOSE BUTTON*/}
          <div className="w-full flex justify-end p-2">
            <AiOutlineClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          {/*LOGO*/}
          <div className="p-5 font-poppins text-neutral-500 text-sm border-b font-medium">
            <Link
              to={"/"}
              className="flex items-center gap-3 hover:cursor-pointer"
            >
              DreamScape Accommodations
            </Link>
          </div>
          <ul className="flex flex-col items-start mt-2 w-full text-neutral-600 gap-5 text-sm">
            <Link
              to={"/"}
              className="flex items-center gap-10 w-full px-5 pt-3 hover:text-blue-600 transition-colors duration-100 hover:cursor-pointer"
            >
              <BsHouse />
              <span>Home</span>
            </Link>
            <Link
              to={"/profile"}
              className="flex items-center gap-10 w-full px-5 pt-3 hover:text-blue-600 transition-colors duration-100 hover:cursor-pointer"
            >
              <LuLayoutDashboard />
              <span>Dashboard</span>
            </Link>
            <li className="flex items-center gap-10 w-full px-5 pt-3 hover:text-blue-600 transition-colors duration-100 hover:cursor-pointer">
              <LuLogOut />
              <span onClick={signOut}>Sign Out</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="main mx-auto w-full px-2">
        <div className="dash flex items-center justify-between w-full p-2">
          <h1 className="text-center w-full">Dashboard</h1>
          <div className="rounded-full overflow-hidden border w-10 h-10">
            <img
              src={`${import.meta.env.VITE_BACKEND_SERVER}/${user_data?.photo}`}
              alt="user profile picture"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
