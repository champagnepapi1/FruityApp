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
    alignItems: "left",
    backgroundColor: "white",
    borderRadius: 20,
  },
  itemView: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  itemIcon: {
    width: 24, 
    height: 24
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  searchInputContainer: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: StatusBar.currentHeight || 0,

  },
  searchInput: {
    width: '90%',
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "white"
  }
});