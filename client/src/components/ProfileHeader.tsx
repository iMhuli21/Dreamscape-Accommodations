import axios from "axios";
import SideNav from "./SideNav";
import { toast } from "react-toastify";
import { LuMenu } from "react-icons/lu";
import UpdatePhoto from "./UpdatePhoto";
import { useEffect, useState } from "react";
import useNavContext from "../hooks/useNavContext";
import useUpdateContext from "../hooks/useUpdateContext";
import { toast_options, userData, User } from "../utilities/constants";

export default function ProfileHeader() {
  const { setShowMenu } = useNavContext();
  const { update } = useUpdateContext();
  const [user_data, setUserData] = useState<User | null>(null);

  const getUserInfo = async () => {
    try {
      const user_data: userData = JSON.parse(localStorage.getItem("user")!);

      const { data } = await axios("/users/my-photo", {
        headers: {
          Authorization: `Bearer ${user_data?.token}`,
        },
      });

      setUserData(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [update]);
  return (
    <div className="flex items-center border-b p-2">
      <div className="side p-2">
        <LuMenu
          className="text-2xl hover:cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
        <SideNav />
      </div>
      <div className="main mx-auto w-full px-2">
        <div className="dash flex items-center justify-between w-full p-2">
          <h1 className="text-center w-full font-permanent text-neutral-600 text-3xl cursor-pointer">
            Dashboard
          </h1>
          <UpdatePhoto user={user_data!} />
        </div>
      </div>
    </div>
  );
}
