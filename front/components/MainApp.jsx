import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Text,
  Pressable,
} from "react-native";
import { styles } from "./styles/safeArea";
import { Card, Divider, FAB } from "@rneui/themed";
import { Link, router } from "expo-router";
export default function MainApp() {
  //...//
  return (
    <SafeAreaView>
      <ScrollView>
        <View className={"bg-red-200 p-2 py-3"}>
          <Text className={"text-2xl"}>Venta de boletos de Avior</Text>
        </View>
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
                onPress={() => router.push("/comprarBoleto")}
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
