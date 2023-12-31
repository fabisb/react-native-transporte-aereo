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
import { Button, Card, Dialog, Divider, Input } from "@rneui/themed";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./ConsultarVuelos";

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
    console.log("useEffect");
    const obtenerData = async () => {
      try {
        const data = await getData(user);
        data != null
          ? setUserData(data)
          : Platform.OS != "web"
          ? Alert.alert(
              "No se a encontrado Boleto",
              "El usuario que ha ingresado no tiene boletos comprados"
            )
          : alert(
              "No se a encontrado Boleto",
              "El usuario que ha ingresado no tiene boletos comprados"
            );
      } catch (error) {
        console.log(error);
      }
    };
    obtenerData();
  }, []);

  return (
    <>
      {Object.entries(userData).length !== 0 ? (
        <>
          <View className={"self-center"}>
            <Text className={"text-2xl"}>
              {userData.user.nombre} || {userData.user.cedula}
            </Text>
          </View>
          <Divider></Divider>
          <View className={"gap-2 my-2 flex flex-wrap"} style={styles.user}>
            <Text className={"font-bold"} style={styles.name}>
              #{userData.vuelo.id}
            </Text>
            <Text style={styles.name}>{userData.vuelo.vuelo}</Text>
            <Divider orientation="vertical" width={2}></Divider>
            <Text style={styles.name}>
              Hora de salida: {userData.vuelo.salida}
            </Text>
            <Text style={styles.name}>
              Hora de llegada: {userData.vuelo.llegada}
            </Text>
            <Text style={styles.precio}>Precio: {userData.vuelo.precio}$</Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
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
