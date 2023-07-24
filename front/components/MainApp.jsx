import React from "react";
import { View, ScrollView, SafeAreaView, Alert, Text } from "react-native";
import { styles } from "./styles/safeArea";
import { Card, Divider } from "@rneui/themed";
export default function MainApp() {
  //...//
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View className={"bg-red-400 p-2 py-3"}>
          <Text className={"text-2xl"}>Venta de boletos de Avior</Text>
        </View>
        <Card>
          <Card.Title>SELECCIONE UNA OPCION</Card.Title>
          <Card.Divider />
          <View style={styles.vertical}>
            <Text>Left text</Text>
            <Divider orientation="vertical" />
            <Text>Right text</Text>
          </View>
          <View style={styles.vertical}>
            <Text>Left text</Text>
            <Divider orientation="vertical" />
            <Text>Right text</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
