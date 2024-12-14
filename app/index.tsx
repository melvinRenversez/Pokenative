import { Link } from "expo-router";
import { useState } from "react"
import {StyleSheet, View, Text, TouchableOpacity } from "react-native"
import {useMoney} from "./MoneyContext";

export default function Index() {

  const { money, setMoney, level } = useMoney();

  const add = level**2


  return <View style={Styles.content}>
    <Text style={Styles.h1}>Welcome to Home !</Text>

    <View style={Styles.inf}>
      <Text style={Styles.h2}>Money = {money}$</Text>
      <Text style={Styles.h2}>Level = {level}</Text>
    </View>

    <TouchableOpacity
      style={Styles.button}
      onPress={ () => setMoney(money + add)}
    >

      <Text style={Styles.h2}>Add {add}$</Text>
    </TouchableOpacity>


    <View style={Styles.bottom}>
      <Link href='/' style={Styles.h3}>Home</Link>
      <Link href='/shop' style={Styles.h3}>Shop</Link>
    </View>

  </View>
}


const Styles = StyleSheet.create({
  h1 : {
    fontSize: 37
  },
  h2 : {
    fontSize: 27
  },
  h3 : {
    fontSize: 20
  },
  content : {
    backgroundColor: "#FF00FF",
    display: "flex",
    gap: 20,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 90,
  },

  button : {
    width: 300,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    padding: 20,
    borderRadius: 20
  },

  bottom : {
    backgroundColor: "orange",
    width: "100%",
    height: 80,
    position: "absolute",
    bottom : 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  inf : {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  }
});