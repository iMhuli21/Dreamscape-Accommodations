import axios from "axios";
import { toast } from "react-toastify";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast_options } from "../utilities/constants";
import Logo from "../assets/6090058_bed_rent_room_icon.svg";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        fullname,
        password,
      };
      await axios.post("/users/signup", payload);

      toast.success(
        "Successfully created an account, you can now login",
        toast_options
      );

      navigate("/login");

      setEmail("");
      setFullname("");
      setPassword("");
    } catch (error: any) {
      const { data }: any = error.response;
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

      <div className="border shadow w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mx-auto mt-20 p-4 text-neutral-800 rounded-lg h-[26rem] flex flex-col gap-2 items-center">
        <h1 className="text-2xl w-11/12">Sign up</h1>
        <span className="text-sm text-neutral-500 w-11/12">
          Sign up and find your dream accommodation
        </span>
        <form
          className="flex flex-col items-start mt-5 w-11/12 gap-5"
          onSubmit={registerUser}
        >
          <div className="relative w-full bg-white">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full placeholder-transparent peer p-2 focus:outline-blue-600 focus:outline-2 outline outline-offset-2 outline-1 outline-gray-400 rounded-lg text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-2 -top-3 bg-white peer-placeholder-shown:top-2 peer-focus:-top-4 transition-all duration-100 text-sm">
              Email
            </label>
          </div>

          <div className="relative w-full bg-white">
            <input
              type="text"
              placeholder="Fullname"
              name="fullname"
              className="w-full placeholder-transparent peer p-2 focus:outline-blue-600 focus:outline-2 outline outline-offset-2 outline-1 outline-gray-400 rounded-lg text-sm"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <label className="absolute left-2 -top-3 bg-white peer-placeholder-shown:top-2 peer-focus:-top-4 transition-all duration-100 text-sm">
              Fullname
            </label>
          </div>

          <div className="relative w-full bg-white">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full placeholder-transparent peer p-2 focus:outline-blue-600 focus:outline-2 outline outline-offset-2 outline-1 outline-gray-400 rounded-lg text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-2 -top-3 bg-white peer-placeholder-shown:top-2 peer-focus:-top-4 transition-all duration-100 text-sm">
              Password
            </label>
          </div>

          <Link
            to={"/login"}
            className="text-sm text-blue-600 font-semibold hover:text-blue-700"
          >
            Already Have An Account?
          </Link>

          <button className="p-2 rounded-full bg-blue-800 text-white w-full hover:bg-blue-900 transition-all duration-100">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
