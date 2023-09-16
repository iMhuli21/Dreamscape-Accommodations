import { useContext } from "react";
import { signedInContext } from "../contexts/SignedInProvider";

export default function useSignedIn() {
  const myContext = useContext(signedInContext);

  if (!myContext)
    throw new Error("SignedInContext must be used in SignedInProvider");

  return myContext;
}
