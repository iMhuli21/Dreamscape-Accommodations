import Logo from "../assets/6090058_bed_rent_room_icon.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="font-Inclusive">
      <nav className="p-2">
        <Link to={"/"} className="flex items-center gap-3 hover:cursor-pointer">
          <img src={Logo} alt="logo" className="w-20" />
          <span>DreamScape Accommodations</span>
        </Link>
      </nav>
    </header>
  );
}
