import { useContext } from "react";
import { showMenuContext } from "../contexts/NavProvider";

export default function useNavContext() {
  const mycontext = useContext(showMenuContext);

  if (!mycontext) throw new Error("NavContext must be used in NavProvider");

  return mycontext;
}
