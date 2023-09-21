import { useParams } from "react-router";
import Header from "../components/Header";

export default function PlaceInfo() {
  const { id } = useParams();

  return (
    <div>
      <Header />
    </div>
  );
}
