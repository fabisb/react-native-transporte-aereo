import React from "react";
import { View, Text, Pressable } from "react-native";

import { router } from "expo-router";

function Header() {
  return (
    <>
      <Pressable onPress={() => router.push("/")}>
        <View
          style={{ backgroundColor: "rgba(199, 43, 98, 1)" }}
          className={" p-2 py-3"}
        >
          <Text className={"text-2xl"}>Venta de boletos de Avior</Text>
        </View>
      </Pressable>
    </>
  );
}

export default Header;
