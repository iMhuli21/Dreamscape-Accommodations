import { BsHouse, BsSearch } from "react-icons/bs";
import useSignedIn from "../hooks/useSignedIn";
import { AiOutlineClose } from "react-icons/ai";
import useNavContext from "../hooks/useNavContext";
import { Link, useNavigate } from "react-router-dom";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";

export default function SideNav() {
  const navigate = useNavigate();
  const { setLoggedIn } = useSignedIn();
  const { showMenu, setShowMenu } = useNavContext();
  const signOut = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <div
      className={
        showMenu
          ? " bg-white fixed left-0 top-0 w-5/12 md:w-4/12 h-full z-10 border-r lg:w-3/12 font-Inclusive"
          : "hidden"
      }
    >
      {/*CLOSE BUTTON*/}
      <div className="w-full flex justify-end p-2">
        <AiOutlineClose
          className="text-2xl hover:cursor-pointer"
          onClick={() => setShowMenu(false)}
        />
      </div>
      {/*LOGO*/}
      <div className="p-5 font-poppins text-neutral-500 text-sm border-b font-medium">
        <Link to={"/"} className="flex items-center gap-3 hover:cursor-pointer">
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
        <Link
          to={"/search"}
          className="flex items-center gap-10 w-full px-5 pt-3 hover:text-blue-600 transition-colors duration-100 hover:cursor-pointer"
        >
          <BsSearch />
          <span>Search</span>
        </Link>
        <li className="flex items-center gap-10 w-full px-5 pt-3 hover:text-blue-600 transition-colors duration-100 hover:cursor-pointer">
          <LuLogOut />
          <span onClick={signOut}>Sign Out</span>
        </li>
      </ul>
    </div>
  );
}
