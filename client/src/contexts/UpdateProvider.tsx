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

interface UpdateInter {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

export const updateContext = createContext<UpdateInter | null>(null);

export default function UpdateProvider({ children }: Props) {
  const [update, setUpdate] = useState(false);
  return (
    <updateContext.Provider value={{ update, setUpdate }}>
      {children}
    </updateContext.Provider>
  );
}
