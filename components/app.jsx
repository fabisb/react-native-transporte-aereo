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

export default function App() {
  //...//
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View className={'bg-slate-600'}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
