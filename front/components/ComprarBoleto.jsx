import React, { createRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  Text,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { Button, Card, Dialog, Input } from "@rneui/themed";
import Header from "./Header";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

function ComprarBoletoComp() {
  const [visible, setVisible] = useState(true);
  const [cedula, setCedula] = useState(0);
  const [nombre, setNombre] = useState("");

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };
  const storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
  const ingresarDatos = () => {
    console.log(nombre);
    console.log(cedula);
    if (
      nombre === "" ||
      isNaN(cedula) ||
      cedula == 0 ||
      !cedula ||
      cedula.toString().length !== 8
    ) {
      console.log("if");
      if (Platform.OS === "web") {
        return alert(
          "Error al ingresar datos. Hubo un error al ingresar la cedula o nombre. Ingrese datos validos"
        );
      } else {
        return Alert.alert(
          "Error al ingresar datos",
          "Hubo un error al ingresar la cedula o nombre. Ingrese datos validos"
        );
      }
    }

    setVisible(false);
  };
  const handleNombreChange = (e) => setNombre(e);
  const handleCedulaChange = (e) => setCedula(e);

  const addCompra = async (id, vuelo, salida, llegada, precio) => {
    const vuelosData = await getData(cedula);
    console.log(vuelosData);
    if (vuelosData) {
      if (Platform.OS == "web") {
        alert(
          "ERROR AL REALIZAR COMPRA. Ya hay una compra realizada con esta cedula"
        );
        return router.push("/");
      } else {
        return Alert.alert(
          "ERROR AL REALIZAR COMPRA",
          "Ya hay una compra realizada con esta cedula",
          [
            {
              text: "Inicio",
              style: "cancel",
              onPress: () => router.push("/"),
            },
          ]
        );
      }
    }
    await storeData(
      {
        user: { nombre, cedula },
        vuelo: { id, vuelo, llegada, salida, precio },
      },
      cedula
    );
    if (Platform.OS == "web") {
      alert(
        "COMPRA REALIZADA CON EXITO. Puede consultar su compra en las opciones siguientes"
      );
      return router.push("/");
    } else {
      return Alert.alert(
        "COMPRA REALIZADA CON EXITO",
        "Puede consultar su compra en las opciones siguientes",
        [
          {
            text: "Continuar",
            style: "default",
            onPress: () => router.push("/"),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Header></Header>
        <Dialog isVisible={visible} fullScreen={true} ModalComponent={Modal}>
          <Dialog.Title
            titleStyle={{ fontSize: 30 }}
            title="Informacion para la compra"
          />
          <Text className={"text-2xl"}>
            Ingrese su nombre y numero de cedula.
          </Text>
          <Input onChangeText={handleNombreChange} placeholder="Nombre"></Input>
          <Input
            onChangeText={handleCedulaChange}
            placeholder="Nro Cedula"
          ></Input>
          <Button
            title="INGRESAR"
            icon={{
              name: "user",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(199, 43, 98, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            onPress={ingresarDatos}
          />
          <Button
            title="REGRESAR"
            titleStyle={{ fontWeight: "600" }}
            buttonStyle={{
              backgroundColor: "rgba(199, 43, 98, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
              marginTop: 5,
            }}
            onPress={() => router.push("/")}
          />
        </Dialog>
        <View>
          <Card>
            <Card.Title>SELECCIONE PARA COMPRAR</Card.Title>
            <Card.Divider />
            {vuelos.map((ciudad, i) => {
              return (
                <Card key={"ciudad" + i}>
                  <Card.Title>{ciudad.ciudad}</Card.Title>
                  {ciudad.vuelos.map((vuelo, i) => {
                    return (
                      <Card.Divider key={"vuelo" + i}>
                        <Pressable
                          onPress={() =>
                            addCompra(
                              vuelo.idVuelo,
                              vuelo.vuelo,
                              vuelo.salida,
                              vuelo.llegada,
                              vuelo.precio
                            )
                          }
                        >
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
                        </Pressable>
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
    marginTop: 1,
  },
  precio: {
    fontSize: 15,
    marginTop: 1,
    fontWeight: "bold",
  },
});

export default ComprarBoletoComp;
