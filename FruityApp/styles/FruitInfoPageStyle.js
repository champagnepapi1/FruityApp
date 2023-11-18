import { StyleSheet, StatusBar } from "react-native";

export const fruitInfoPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    // Add styling for your image container here
    // Example: width, height, margin, etc.
    marginRight: 10,
  },
  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  pageTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 32,
  },
  containerBox: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#E0004D",
    borderRadius: 20,
    elevation: 10
  },
  favoriteButton: {
    marginTop: 15,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleContainer: {
    alignItems: "center"
  },
  title: {
    fontSize: 50,
    color: "white"
  },
  textStyle: {
    fontSize: 20,
    color: "white"
  },
  lineContainer: {
    alignItems: "center",
    width: "100%"
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "white",
    marginTop: 10
  },
  familyContainer: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  genusContainer: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  orderContainer: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  nutritionsContainerBox: {
  },
  nutritionsTitleContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  nutritionsTitle: {
    fontSize: 25,
    color: "white"

  },
  nutritionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  nutritions: {
    fontSize: 15,
    color: "white"
  }

});