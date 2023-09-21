import axios from "axios";
import SideNav from "./SideNav";
import { toast } from "react-toastify";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import useSignedIn from "../hooks/useSignedIn";
import useNavContext from "../hooks/useNavContext";
import Logo from "../assets/6090058_bed_rent_room_icon.svg";
import { User, toast_options } from "../utilities/constants";

export default function Header() {
  const { setShowMenu } = useNavContext();
  const { loggedIn, setLoggedIn } = useSignedIn();
  const [user_data, setUserData] = useState<User | null>(null);
  const isLoggedIn = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user")!);

      if (!userData) return setLoggedIn(false);

      setLoggedIn(true);

      const { data } = await axios("/users/my-photo", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });

      setUserData(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <header className="font-permanent border-b">
      <nav className="p-2 flex justify-between">
        <div className="flex items-center gap-8">
          <LuMenu
            className="text-2xl hover:cursor-pointer text-neutral-700"
            onClick={() => setShowMenu(true)}
          />
          <SideNav />
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <img src={Logo} alt="logo" className="w-20" />
            <span className="text-xl text-neutral-600">
              DreamScape Accommodations
            </span>
          </Link>
        </div>

        <div className="md:flex items-center mr-10 gap-5 hidden ">
          <Link to={"/search"} className="flex flex-col items-center p-2">
            <BsSearch className="text-3xl text-neutral-600" />
          </Link>
          <Link
            to={loggedIn ? "/profile" : "/login"}
            className="flex flex-col items-center p-2"
          >
            {loggedIn ? (
              <div className="rounded-full overflow-hidden border w-10 h-10 hover: cursor-pointer">
                <img
                  src={`${import.meta.env.VITE_BACKEND_SERVER}/${
                    user_data?.photo
                  }`}
                  alt="user profile picture"
                  className="object-cover object-center w-full h-full"
                />
              </div>
            ) : (
              <Avatar rounded />
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
