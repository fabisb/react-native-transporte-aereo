import { StyleSheet, StatusBar } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  pagerView: {
    flex: 1,
  },
  dialog: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  //divider
  horizontal: {
    marginBottom: 10,
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
