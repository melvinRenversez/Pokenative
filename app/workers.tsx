import { Link } from "expo-router";
import {StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function () {
    return (
        <View style={Styles.content}>
            <View style={Styles.top}>
              <Text style={Styles.h1}>
                Welcome to Workers !  
              </Text>
              <Text style={Styles.h2}>
                Money : 0
              </Text>
            </View>

            <View style={Styles.workers}>
                <TouchableOpacity style={Styles.worker}>
                    <Text style={Styles.h3}>Worker 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.worker}>
                    <Text style={Styles.h3}>Worker 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.worker}>
                    <Text style={Styles.h3}>Worker 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.worker}>
                    <Text style={Styles.h3}>Worker 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.worker}>
                    <Text style={Styles.h3}>Worker 1</Text>
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
  top : {
    backgroundColor: "red",
    paddingTop: 20,
    display: "flex",
    alignItems: "center"
  },
  workers: {
    backgroundColor: "blue",
    flex: 1,
    display: "flex",
    gap: 20,
    width: "90%"
  },
  worker: {
    backgroundColor: "orange",
    height: 50,
    borderRadius : 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});
