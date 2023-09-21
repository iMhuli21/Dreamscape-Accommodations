import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Place from "../components/Place";
import { Places } from "../utilities/constants";

export default function Home() {
  const [places, setPlaces] = useState<Places[]>([]);

  const getPlaces = async () => {
    try {
      const { data } = await axios("/places");
      setPlaces(data);
    } catch (error: any) {
      const { data } = error.response;
      console.log(data.error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div className="grid grid-flow-row gap-4 relative font-poppins">
      <Header />
      <Categories />
      <div className="grid w-full p-2 gap-2 gap-y-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((item) => (
          <Place key={item._id} place={item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
