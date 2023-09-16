import { useEffect } from "react";
import { Link } from "react-router-dom";
import useSignedIn from "../hooks/useSignedIn";
import { BsHouse, BsSearch, BsPersonCircle } from "react-icons/bs";

export default function Footer() {
  const { loggedIn, setLoggedIn } = useSignedIn();
  const isLoggedIn = () => {
    const user_data = JSON.parse(localStorage.getItem("user") || "");

    if (!user_data) return setLoggedIn(false);

    return setLoggedIn(true);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <footer className="fixed bottom-0 w-full h-14 font-Inclusive flex items-center justify-evenly border-t text-neutral-700">
      <Link to={"/"} className="flex flex-col items-center p-2">
        <BsHouse className="text-xl" />
        <span>Home</span>
      </Link>
      <Link to={"/search"} className="flex flex-col items-center p-2">
        <BsSearch className="text-xl" />
        <span>Search</span>
      </Link>
      <Link
        to={loggedIn ? "/profile" : "/login"}
        className="flex flex-col items-center p-2"
      >
        <BsPersonCircle className="text-xl" />
        <span>{loggedIn ? "Profile" : "Login"}</span>
      </Link>
    </footer>
  );
}
