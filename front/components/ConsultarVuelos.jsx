import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import { Card } from "@rneui/themed";
import Header from "./Header";

const vuelos = [
  {
    ciudad: "Maracaibo",
    vuelos: [
      {
        idVuelo: "220",
        vuelo: "Maracaibo - Caracas",
        salida: "06:00",
        llegada: "07:00",
        precio: 180,
      },
      {
        idVuelo: "221",
        vuelo: "Caracas - Maracaibo",
        salida: "07:00",
        llegada: "08:00",
        precio: 230,
      },
      {
        idVuelo: "224",
        vuelo: "Maracaibo - Caracas",
        salida: "16:00",
        llegada: "17:00",
        precio: 180,
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
        precio: 150,
      },
    ],
  },
  {
    ciudad: "Barcelona",
    vuelos: [
      {
        idVuelo: "1410",
        vuelo: "Caracas - Barcelona",
        salida: "07:00",
        llegada: "07:45",
        precio: 130,
      },
      {
        idVuelo: "1411",
        vuelo: "Barcelona - Caracas",
        salida: "08:45",
        llegada: "09:30",
        precio: 80,
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
                <Card key={"ciudad" + i}>
                  <Card.Title>{ciudad.ciudad}</Card.Title>
                  {ciudad.vuelos.map((vuelo, i) => {
                    return (
                      <Card.Divider key={"vuelo" + i}>
                        <View
                          className={"gap-2 flex flex-wrap"}
                          style={styles.user}
                        >
                          <Text className={"font-bold"} style={styles.name}>
                            #{vuelo.idVuelo}
                          </Text>
                          <Text style={styles.name}>{vuelo.vuelo}</Text>
                          <Text style={styles.name}>{vuelo.salida}</Text>
                          <Text>-</Text>
                          <Text style={styles.name}>{vuelo.llegada}</Text>
                          <Text style={styles.precio}>{vuelo.precio}$</Text>
                        </View>
                      </Card.Divider>
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

export const styles = StyleSheet.create({
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
    marginTop: 1,
  },
  precio: {
    fontSize: 15,
    marginTop: 1,
    fontWeight: "bold",
  },
});

export default ConsultarVueloComp;
