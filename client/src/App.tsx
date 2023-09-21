import axios from "axios";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AddPlace from "./pages/AddPlace";
import CategoryPlaces from "./pages/CategoryPlaces";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import NavProvider from "./contexts/NavProvider";
import UpdateProvider from "./contexts/UpdateProvider";
import SignedInProvider from "./contexts/SignedInProvider";
import PlaceInfo from "./pages/PlaceInfo";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_SERVER;

export default function App() {
  return (
    <>
      <SignedInProvider>
        <UpdateProvider>
          <NavProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-place" element={<AddPlace />} />
              <Route path="/category/:category" element={<CategoryPlaces />} />
              <Route path="/search" element={<Search />} />
              <Route path="/place/:id" element={<PlaceInfo />} />
            </Routes>
          </NavProvider>
        </UpdateProvider>
      </SignedInProvider>
      <ToastContainer />
    </>
  );
}
