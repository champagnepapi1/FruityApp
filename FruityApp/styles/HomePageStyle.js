import { StyleSheet, StatusBar } from "react-native";

export const homePageStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: "center",
        backgroundColor: "green"
      },
      title: {
        fontSize: 32,
      },
});