import { StyleSheet, StatusBar } from "react-native";

export const homePageStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FF3D3D"
  },
  pageTitleContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: 'center',
    backgroundColor: "#FF953D",

  },
  pageTitle : {
    fontSize: 28,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  item: {
    padding: 20,
    marginVertical: 18,
    marginHorizontal: 16,
    alignItems: "left",
    backgroundColor: "#FF7400",
    borderRadius: 20,
    elevation: 10,
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
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  searchInput: {
    width: "90%",
    backgroundColor: "#FFD9BA",
    color: "#2C1605",
  }
});