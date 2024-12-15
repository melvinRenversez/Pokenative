import { createContext, useState, useContext } from "react";

interface MoneyContextType {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

export const MoneyProvider = ({ children }: { children: React.ReactNode }) => {
  const [money, setMoney] = useState(0);
  const [level, setLevel] = useState(1);

  // Logs pour vérifier l'initialisation de l'état
  console.log("MoneyProvider initialized");
  console.log("Initial money:", money);
  console.log("Initial level:", level);

  return (
    <MoneyContext.Provider value={{ money, setMoney, level, setLevel }}>
      {children}
    </MoneyContext.Provider>
  );
};


export const useMoney = () => {
  const context = useContext(MoneyContext);
  if (!context) throw new Error("useMoney must be used within a MoneyProvider");
  return context;
};
