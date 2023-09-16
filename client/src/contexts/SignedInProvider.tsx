import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface SignedIn {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const signedInContext = createContext<SignedIn | null>(null);

export default function SignedInProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <signedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </signedInContext.Provider>
  );
}
