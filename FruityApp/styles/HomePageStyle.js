import { StyleSheet, StatusBar } from "react-native";

export const homePageStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "100%"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "left",
    backgroundColor: "#E0004D",
    borderRadius: 20,
    elevation: 20,
    borderWidth: 1,
  },
  itemView: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  itemIcon: {
    width: 24, 
    height: 24,
  
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  searchInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: StatusBar.currentHeight || 0,
    backgroundColor: "#E4E0E1"
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#E0004D",
    color: "white",
    paddingLeft: 15
  }
});