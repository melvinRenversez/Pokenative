import { Link } from "expo-router";
import { useState } from "react"
import {StyleSheet, View, Text, TouchableOpacity } from "react-native"

export default function Index() {

  const [money, setMoney] = useState(0)
  const [add, setAdd] = useState(1)


  return <View style={Styles.content}>
    <Text style={Styles.h1}>Welcome to Money!</Text>

    <Text style={Styles.h2}>Money = {money}$</Text>

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
  }
});