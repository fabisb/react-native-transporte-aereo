import React from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import { styles } from "./styles/safeArea";

export default function MainApp() {
  //...//
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View className={"bg-slate-600"}>
          <Text>Hello Word</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
