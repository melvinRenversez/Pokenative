import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useMoney } from "./MoneyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { money, setMoney, level } = useMoney();
  const [autoClicker, setAutoClicker] = useState(false);

  const autoClickerPrice = 100000000;
  const add = parseFloat((level ** level / (level ** 4)).toFixed(2));

  const formatNumber = (number) => {
    return number
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  useEffect(() => {
    const getAutoClicker = async () => {
      try {
        const value = await AsyncStorage.getItem("autoClicker");
        if (value !== null) {
          setAutoClicker(JSON.parse(value));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAutoClicker();
  }, []);

  useEffect(() => {
    const saveAutoClicker = async () => {
      try {
        await AsyncStorage.setItem("autoClicker", JSON.stringify(autoClicker));
      } catch (error) {
        console.error(error);
      }
    };
    saveAutoClicker();
  }, [autoClicker]);

  useEffect(() => {
    if (autoClicker){
      console.log("Auto clicker activated");
      setInterval(() => {
        setMoney((prevMoney) => prevMoney + add);
      }, 1000);
    }
  })

  if (money === undefined || level === undefined) {
    console.log("Error: invalid state in Home");
    return <Text style={Styles.h1}>Loading...</Text>;
  }

  return (
    <View style={Styles.content}>
      <Text style={Styles.h1}>Welcome Home!</Text>

      <View style={Styles.inf}>
        <Text style={Styles.h2}>Money = {formatNumber(money)}$</Text>
        <Text style={Styles.h2}>Level = {level}</Text>
      </View>

      <View style={Styles.buttons}>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            setMoney(money + add);
          }}
        >
          <Text style={Styles.h3}>Add {formatNumber(add)}$</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Styles.button, Styles.autoClicker]}
          onPress={() => {
            console.log("autoClicker: " + autoClicker);
            if (money >= autoClickerPrice && autoClicker === false) {
              setMoney(money - autoClickerPrice);
              setAutoClicker(true);
            }
          }}
          disabled={money < autoClickerPrice}
        >
          <Text style={Styles.h3}>Auto clicker</Text>

          {autoClicker ? (
            <Text style={Styles.h3}> ON</Text>
          ) : (
            <Text style={Styles.h3}>{formatNumber(autoClickerPrice)}$ </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={Styles.bottom}>
        <Link href="/" style={Styles.link}>Home</Link>
        <Link href="/workers" style={Styles.link}>Workers</Link>
        <Link href="/shop" style={Styles.link}>Shop</Link>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  h1: {
    fontSize: 37,
  },
  h2: {
    fontSize: 27,
  },
  h3: {
    fontSize: 20,
  },
  content: {
    backgroundColor: "#FF00FF",
    display: "flex",
    gap: 20,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 90,
  },
  button: {
    width: 300,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  bottom: {
    backgroundColor: "orange",
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inf: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  link: {
    fontSize: 20,
    height: "100%",
    lineHeight: 80,
    textAlign: "center"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
  },
  autoClicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  }
});
