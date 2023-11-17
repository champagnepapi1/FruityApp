import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomePage from "../pages/HomePage";
import FavoritePage from "../pages/FavoritePage";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Favorite" component={FavoritePage} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
