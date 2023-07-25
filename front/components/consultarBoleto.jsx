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
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async () => {
      const data = await getData(user);
      setUserData(data);
      console.log(data);
    };
  }, []);

  return <></>;
};

function ConsultarBoletoComp() {
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
            <Card.Title>CONSULTAR BOLETO</Card.Title>
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

export default ConsultarBoletoComp;
