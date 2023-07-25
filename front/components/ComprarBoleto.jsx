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
} from "react-native";
import { Button, Card, Dialog, Input } from "@rneui/themed";
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
      },
      {
        idVuelo: "221",
        vuelo: "Caracas - Maracaibo",
        salida: "07:00",
        llegada: "08:00",
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
  {
    ciudad: "Barcelona",
    vuelos: [
      {
        idVuelo: "1410",
        vuelo: "Caracas - Barcelona",
        salida: "07:00",
        llegada: "07:45",
      },
      {
        idVuelo: "1411",
        vuelo: "Barcelona - Caracas",
        salida: "08:45",
        llegada: "09:30",
      },
    ],
  },
];

function ComprarBoletoComp() {
  useEffect(() => {
    //setVisible(!visible);
  }, []);
  const [visible, setVisible] = useState(true);
  const [cedula, setCedula] = useState(0);
  const [nombre, setNombre] = useState("");
  const ingresarDatos = () => {
    if (
      nombre === "" ||
      isNaN(cedula) ||
      cedula == 0 ||
      !cedula ||
      cedula.toString().length !== 8
    ) {
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
  return (
    <SafeAreaView>
      <ScrollView>
        <Header></Header>
        <Dialog isVisible={visible} fullScreen={true} ModalComponent={Modal}>
          <Dialog.Title title="Informacion para la compra" />
          <Text>Ingrese su nombre y numero de cedula.</Text>
          <Input
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          ></Input>
          <Input
            onChange={(e) => setCedula(e.target.value)}
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
        </Dialog>
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
});

export default ComprarBoletoComp;
