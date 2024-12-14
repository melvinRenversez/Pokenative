import { Link } from "expo-router";
import { useState } from "react";
import {StyleSheet, View, Text, TouchableOpacity } from "react-native";


export default function Shop() {

    const [updatePrice, update] = useState(100)

    return <View style={Styles.content}>
        <Text style={Styles.h1} >Welcome to Shop!</Text>

        <Text style={Styles.h2}>Money = 0 </Text>
    
        <TouchableOpacity
            style={Styles.button}
        >
            <Text style={Styles.h3}>
                Update for {updatePrice}$
            </Text>
        </TouchableOpacity>
    
    
    
        <View style={Styles.bottom}>
          <Link href='/' style={Styles.h3}>Home</Link>
          <Link href='/shop' style={Styles.h3}>Shop</Link>
        </View>
    
      </View>
}

const Styles = StyleSheet.create({
  h1 : {
    fontSize: 37,
    position: "absolute",
    top: 20,
    color: "#FFFFFF"
  },
  h2 : {
    fontSize: 27,
    paddingBottom: 100,
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
    justifyContent: "center",
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