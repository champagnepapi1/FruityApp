import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomePage from "../pages/HomePage";
import FavoritePage from "../pages/FavoritePage";
import { Image } from "react-native";
import { tabBarStyle } from "../styles/TabBarStyle";

const Tab = createMaterialBottomTabNavigator();

const CustomIconHomePage = () => (
  <Image
    source={require('../assets/homepage.png')}
    style={{ width: 24, height: 24 }}
    resizeMode="contain"
  />
);

const CustomIconFavoritePage = () => (
  <Image
    source={require('../assets/medal.png')}
    style={{ width: 24, height: 24, tintColor: "black" }}
    resizeMode="contain"
  />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarColor: "blue",
    }}>
      <Tab.Screen name="home" component={HomePage} options={{
        tabBarIcon: ({ color, size }) => (
          <CustomIconHomePage />
        ),
      }} style={tabBarStyle.icon}/>
      <Tab.Screen name="Favorite" component={FavoritePage} options={{
        tabBarIcon: ({ color, size }) => (
          <CustomIconFavoritePage />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
