import MainApp from "../components/MainApp";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp></MainApp>
    </SafeAreaProvider>
  );
}
