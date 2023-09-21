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

interface NavInter {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const showMenuContext = createContext<NavInter | null>(null);

export default function NavProvider({ children }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <showMenuContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </showMenuContext.Provider>
  );
}
