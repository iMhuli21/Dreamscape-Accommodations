import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignedInProvider from "./contexts/SignedInProvider";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_SERVER;

export default function App() {
  return (
    <>
      <SignedInProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SignedInProvider>
      <ToastContainer />
    </>
  );
}
