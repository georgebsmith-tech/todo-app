import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AllTasks } from "./src/screens";

export default function App() {
  return (
    <View style={styles.container}>
      <AllTasks />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FA6342"
  }
});
