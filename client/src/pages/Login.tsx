import axios from "axios";
import { toast } from "react-toastify";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast_options } from "../utilities/constants";
import Logo from "../assets/6090058_bed_rent_room_icon.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logUserIn = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password,
      };
      const { data }: any = await axios.post("/users/login", payload);

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Successfully logged In", toast_options);

      navigate("/");

      setEmail("");
      setPassword("");
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  return (
    <div className="font-poppins">
      <div className="p-2 font-Inclusive">
        <Link to={"/"} className="flex items-center gap-3 hover:cursor-pointer">
          <img src={Logo} alt="logo" className="w-20" />
          <span>DreamScape Accommodations</span>
        </Link>
      </div>

      <div className="border shadow w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mx-auto mt-20 p-4 text-neutral-800 rounded-lg h-[22rem] flex flex-col gap-2 items-center">
        <h1 className="text-2xl w-11/12">Sign in</h1>
        <span className="text-sm text-neutral-500 w-11/12">
          Sign in and find your dream accommodation
        </span>
        <form
          className="flex flex-col items-start mt-5 w-11/12 gap-5"
          onSubmit={logUserIn}
        >
          <div className="relative w-full bg-white">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full placeholder-transparent peer p-2 focus:outline-blue-600 focus:outline-2 outline outline-offset-2 outline-1 outline-gray-400 rounded-lg text-sm border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-2 -top-3 bg-white peer-placeholder-shown:top-2 peer-focus:-top-4 transition-all duration-100 text-sm">
              Email
            </label>
          </div>

          <div className="relative w-full bg-white">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full placeholder-transparent peer p-2 focus:outline-blue-600 focus:outline-2 outline outline-offset-2 outline-1 outline-gray-400 rounded-lg text-sm border-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-2 -top-3 bg-white peer-placeholder-shown:top-2 peer-focus:-top-4 transition-all duration-100 text-sm">
              Password
            </label>
          </div>

          <Link
            to={"/register"}
            className="text-sm text-blue-600 font-semibold hover:text-blue-700"
          >
            Dont Have An Account?
          </Link>

          <button className="p-2 rounded-full bg-blue-800 text-white w-full hover:bg-blue-900 transition-all duration-100 outline-none">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
