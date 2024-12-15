import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

interface MoneyContextType {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

export const MoneyProvider = ({ children }: { children: React.ReactNode }) => {
  const [money, setMoney] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const getMoney = async () => {
      try {

        const storedMoney = await AsyncStorage.getItem("money");
        const storedLevel = await AsyncStorage.getItem("level");

        setMoney(Number(storedMoney) || 100);
        setLevel(Number(storedLevel) || 1);

        console.log("Money and level loaded from async storage");

      }catch (error) {
        console.error("Error getting money from async storage", error);
      }
    }

    getMoney();
  }, [])

  useEffect(() => {
    const saveMoney = async () => {
      try {
        await AsyncStorage.setItem("money", String(money));
        await AsyncStorage.setItem("level", String(level));
        console.log("Money and level saved to async storage");
      }catch (error) {
        console.error("Error saving money to async storage", error);
      }
    }

    saveMoney()
  }, [money, level])

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
