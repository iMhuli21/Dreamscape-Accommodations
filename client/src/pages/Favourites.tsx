import axios from "axios";
import { toast } from "react-toastify";
import Place from "../components/Place";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Places, toast_options, userData } from "../utilities/constants";

export default function Favourites() {
  const [myFavourites, setMyFavourites] = useState<Places[]>([]);

  const getMyFavourites = async () => {
    try {
      const user_data: userData = JSON.parse(localStorage.getItem("user")!);

      const { data } = await axios("/users/my-favourites", {
        headers: {
          Authorization: `Bearer ${user_data.token}`,
        },
      });

      setMyFavourites(data.favouritePlaces);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  const removeFavourite = async (id: string) => {
    setMyFavourites(myFavourites.filter((place) => place._id !== id));

    let updatedFavs = myFavourites.filter((place) => place._id !== id);

    try {
      const user_data: userData = JSON.parse(localStorage.getItem("user")!);
      await axios.put(
        "/users/my-favourites",
        {
          favouritePlaces: updatedFavs,
        },
        {
          headers: {
            Authorization: `Bearer ${user_data.token}`,
          },
        }
      );
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getMyFavourites();
  }, []);
  return (
    <div className="font-poppins text-neutral-700">
      <Header />
      <div className="mt-10">
        <h1 className="text-center text-lg">My Favourites</h1>
        <div className="relative grid w-full p-2 gap-2 gap-y-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {myFavourites.map((item) => (
            <Place
              place={item}
              page="favourites"
              key={item._id}
              onClick={() => removeFavourite(item._id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
