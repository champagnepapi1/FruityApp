import { Center } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

export const tabBarStyle = StyleSheet.create({
    tabContainer: {
        width: "100%",
      },
      tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#E0004D",
      },
      homeButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        marginLeft: 30
      },
      favoriteButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        marginRight: 30
      },
      labelHome: {
        color: "white"
      },
      labelFavorite: {
        color: "white"
      },
      activeButton: {
        backgroundColor: 'black', // Change this to the desired active button background color
      },
});