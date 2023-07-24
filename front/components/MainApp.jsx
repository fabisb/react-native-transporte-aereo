import React from "react";
import { View, ScrollView, SafeAreaView, Alert, Text } from "react-native";
import { styles } from "./styles/safeArea";
import { Card, Divider, FAB } from "@rneui/themed";
import { Link, router } from "expo-router";
import Header from "./Header";
export default function MainApp() {
  //...//
  return (
    <SafeAreaView>
      <ScrollView>
        <Header></Header>
        <Card>
          <Card.Title>SELECCIONE UNA OPCION</Card.Title>
          <Card.Divider />
          <View style={styles.vertical}>
            <View className={"gap-2"}>
              <Text>Comprar un Boleto</Text>
              <FAB
                onPress={() => router.push("/comprarBoleto")}
                icon={{ name: "add-shopping-cart", color: "white" }}
                color="red"
              ></FAB>
            </View>
            <Divider orientation="vertical" />
            <View className={"gap-2"}>
              <Text>Cancelar Boleto</Text>
              <FAB
                onPress={() => router.push("/comprarBoleto")}
                icon={{ name: "cancel", color: "white" }}
                color="red"
              />
            </View>
          </View>
          <View style={styles.vertical}>
            <View className={"gap-2"}>
              <Text>Consultar un Boleto</Text>
              <FAB
                onPress={() => router.push("/comprarBoleto")}
                icon={{ name: "search", color: "white" }}
                color="red"
              />
            </View>
            <Divider orientation="vertical" />
            <View className={"gap-2"}>
              <Text>Consultar Vuelos</Text>
              <FAB
                onPress={() => router.push("/consultarVuelos")}
                icon={{ name: "airplanemode-active", color: "white" }}
                color="red"
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
