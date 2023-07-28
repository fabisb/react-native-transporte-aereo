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
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputForm = (props) => {
  const handleCedulaChange = props.handleCedulaChange;
  const ingresarDatos = props.ingresarDatos;

  return (
    <>
      <Text className={"text-2xl"}>Ingrese numero de cedula.</Text>
      <Input onChangeText={handleCedulaChange} placeholder="Nro Cedula"></Input>
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
    </>
  );
};

const ConsultaComp = ({ user }) => {
  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
      // remove error
    }

    console.log("Done.");
  };
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
  const [verificacion, setVerificacion] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log("useEffect");
    const obtenerData = async () => {
      try {
        const data = await getData(user);
        setTimeout(async () => {
          if (data) {
            await setUserData(data);

            await removeValue(data.user.cedula);

            Platform.OS != "web"
              ? Alert.alert(
                  "Boleto eliminado",
                  "El boleto que ha ingresado ha sido cancelado"
                )
              : alert(
                  "Boleto eliminado",
                  "El boleto que ha ingresado ha sido cancelado"
                );
            setVerificacion(true);
          } else {
            Platform.OS != "web"
              ? Alert.alert(
                  "No se a encontrado Boleto",
                  "El usuario que ha ingresado no tiene boletos comprados"
                )
              : alert(
                  "No se a encontrado Boleto",
                  "El usuario que ha ingresado no tiene boletos comprados"
                );
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerData();
  }, []);

  return (
    <>
      {verificacion ? (
        <>
          <View className={"self-center"}>
            <Text className={"text-2xl"}>Eliminado con exito</Text>
          </View>
        </>
      ) : (
        <>...</>
      )}
    </>
  );
};

function CancelarBoletoComp() {
  const [user, setUser] = useState("");
  const [cedula, setCedula] = useState(0);
  const handleCedulaChange = (e) => setCedula(e);

  const ingresarDatos = () => {
    console.log(cedula);
    if (
      isNaN(cedula) ||
      cedula == 0 ||
      !cedula ||
      cedula.toString().length !== 8
    ) {
      console.log("if");
      if (Platform.OS === "web") {
        return alert(
          "Error al ingresar datos. Hubo un error al ingresar la cedula. Ingrese datos validos"
        );
      } else {
        return Alert.alert(
          "Error al ingresar datos",
          "Hubo un error al ingresar la cedula. Ingrese datos validos"
        );
      }
    }
    setUser(cedula);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Header></Header>
        <View>
          <Card>
            <Card.Title>CANCELAR BOLETO</Card.Title>
            <Card.Divider />
            {user == "" ? (
              <InputForm
                handleCedulaChange={handleCedulaChange}
                ingresarDatos={ingresarDatos}
              ></InputForm>
            ) : (
              <ConsultaComp user={user}></ConsultaComp>
            )}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CancelarBoletoComp;
