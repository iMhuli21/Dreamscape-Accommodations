import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import { toast_options, userData, ProfileData } from "../utilities/constants";

export default function Profile() {
  const [myplaces, setMyPlaces] = useState([]);

  return (
    <div className="font-poppins ">
      <ProfileHeader />
      <div>
        <h1 className="text-center mt-10">My Places</h1>
      </div>
      <Footer />
    </div>
  );
}
