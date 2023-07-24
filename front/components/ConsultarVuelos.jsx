import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
//import { styles } from "./styles/safeArea";
import { Card, Divider, FAB } from "@rneui/themed";
import { Link, router } from "expo-router";
import Header from "./Header";

const vuelos = [
  {
    ciudad: "Maracaibo",
    vuelos: [
      {
        idVuelo: "220",
        vuelo: "Maracaibo - Caracas",
        salida: "6:00",
        llegada: "7:00",
      },
      {
        idVuelo: "221",
        vuelo: "Caracas - Maracaibo",
        salida: "7:00",
        llegada: "8:00",
      },
      {
        idVuelo: "224",
        vuelo: "Maracaibo - Caracas",
        salida: "16:00",
        llegada: "17:00",
      },
    ],
  },
  {
    ciudad: "Barquisimeto",
    vuelos: [
      {
        idVuelo: "1602",
        vuelo: "Barquisimeto - Caracas",
        salida: "14:45",
        llegada: "15:30",
      },
    ],
  },
];

function ConsultarVueloComp() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header></Header>
        <View>
          <Card>
            <Card.Title>VUELOS DISPONIBLES</Card.Title>
            <Card.Divider />
            {vuelos.map((ciudad, i) => {
              return (
                <Card>
                  <Card.Title>{ciudad.ciudad}</Card.Title>
                  {ciudad.vuelos.map((vuelo, i) => {
                    return (
                      <>
                        <Card.Divider />
                        <View key={i} style={styles.user}>
                          <Text style={styles.name}>{vuelo.vuelo}</Text>
                        </View>
                      </>
                    );
                  })}
                </Card>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ConsultarVueloComp;
