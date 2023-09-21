import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Places, toast_options } from "../utilities/constants";
import Place from "../components/Place";

export default function CategoryPlaces() {
  const { category } = useParams();
  const [categoryPlaces, setCategoryPlaces] = useState<Places[]>([]);

  const getCategoryPlaces = async () => {
    try {
      const { data } = await axios(`/places/category/${category}`);

      setCategoryPlaces(data);
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.error, toast_options);
    }
  };

  useEffect(() => {
    getCategoryPlaces();
  }, []);
  return (
    <div className="font-poppins text-neutral-700">
      <Header />
      <div className="mt-10">
        <h1 className="text-center text-lg">Places with {category} category</h1>
        <div className="grid w-full p-2 gap-2 gap-y-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPlaces.map((item) => (
            <Place key={item._id} place={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
