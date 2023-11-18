import { StyleSheet, StatusBar } from "react-native";

export const homePageStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "100%"
  },
  pageTitleContainer: {
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: StatusBar.currentHeight || 0,
    marginLeft: 32,
    alignItems: "center"
  },
  pageTitle : {
    fontSize: 32
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "left",
    backgroundColor: "#E0004D",
    borderRadius: 20,
    elevation: 10
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
    paddingBottom: StatusBar.currentHeight || 0,
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "black",
    paddingLeft: 15
  }
});