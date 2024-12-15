import { Link } from "expo-router";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useMoney } from "./MoneyContext"; 
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialWorkers = [
  {id: 1, name: "worker", level: 0, give: 0, cost: 0},
  {id: 2, name: "worker", level: 0, give: 0, cost: 0},
  {id: 3, name: "worker", level: 0, give: 0, cost: 0},
  {id: 4, name: "worker", level: 0, give: 0, cost: 0},
  {id: 5, name: "worker", level: 0, give: 0, cost: 0},
  {id: 6, name: "worker", level: 0, give: 0, cost: 0},
  {id: 7, name: "worker", level: 0, give: 0, cost: 0},
  {id: 8, name: "worker", level: 0, give: 0, cost: 0},
  {id: 9, name: "worker", level: 0, give: 0, cost: 0},
  {id: 10, name: "worker", level: 0, give: 0, cost: 0},
  {id: 11, name: "worker", level: 0, give: 0, cost: 0}
]

export default function () {
  
  const { money, setMoney } = useMoney();
  
  const [workers, setWorkers] = useState(initialWorkers);

  const formatNumber = (number) => {
    return number
      .toFixed(0) // Limite à deux décimales
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Ajoute un espace tous les 3 chiffres
  };

  const updateWorkerById = (id) => {
    setWorkers( (prevWorkers) =>
      prevWorkers.map( (worker) => 
        worker.id == id
          ? {
            ...worker,
            level: worker.level + 1,
            give : worker.level === 0 
              ? 0
              : 2 +  worker.id * ( worker.level + 1) * worker.id * worker.level,
            cost : 12 * (worker.level + 1) * worker.id**3 * (worker.level + 1) ** 2
          }
        : worker
      )
    )
  }

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("workers");
        console.log(jsonValue);
        if (jsonValue!== null) {
          setWorkers(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error(error);
      }
    }
    getWorkers();
  }, []);

  useEffect(() => {
    const saveWorkers = async () => {
      try {
        await AsyncStorage.setItem("workers", JSON.stringify(workers))
      }catch (error) {
        console.error(error);
      }
    }
    saveWorkers();
  }, [workers]);

  useEffect(() => {

    const interval = setInterval(() => {

      workers.forEach((worker) => {
        if (worker.give > 0) {
          setMoney((prevMoney) => prevMoney + worker.give);
        }
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [workers, setMoney]);

  useEffect(() => {
    initialWorkers.forEach( (worker) => {
      updateWorkerById(worker.id)
    })
  }, []);

  return (
      <View style={Styles.content}>
        <View style={Styles.top}>
          <Text style={Styles.h1}>
              Welcome to Workers !  
            </Text>
            <Text style={Styles.h2}>
               Money : {formatNumber(money)}$
            </Text>
          </View>

          
          <ScrollView
            style={Styles.workers}
            showsVerticalScrollIndicator={false}
          >
              {
                workers.map((worker) => (
                  <TouchableOpacity 
                    key={worker.id} 
                    style={[worker.level == 0 ? [Styles.worker, Styles.workerDisabled] : Styles.worker, 
                      {
                        marginBottom: 20
                      }]}
                    onPress={ () => {
                      if ( money >= worker.cost){
                        setMoney(money - worker.cost)
                        updateWorkerById(worker.id)
                      }
                    }}
                  >
                    <Text style={Styles.h3}>{worker.name} {worker.id}</Text>
                    <Text style={Styles.h3}>{formatNumber(worker.give)}$/s</Text>
                    <Text style={Styles.h3}>{formatNumber(worker.cost)}$</Text>
                  </TouchableOpacity>
                ))
              }
          </ScrollView>
    
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
    width: "90%",
    overflowY: "scroll",
    padding: 10
  },
  worker: {
    backgroundColor: "orange",
    height: 50,
    borderRadius : 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  workerDisabled: {
    backgroundColor: "gray",
    opacity: 0.5
  }
});
