import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
        flexDirection: "row",
      backgroundColor:"white",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.84,
    elevation: 10,
  },
});

export { style };
