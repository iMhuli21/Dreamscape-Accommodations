import { useContext } from "react";
import { updateContext } from "../contexts/UpdateProvider";

export default function useUpdateContext() {
  const myContext = useContext(updateContext);

  if (!myContext)
    throw new Error("UpdateContext must be used in UpdateProvider");

  return myContext;
}
