import React from 'react';
import { Provider } from 'react-redux';
import store from './utils/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FruitInfoPage from './pages/FruitInfoPage';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { tabBarStyle } from './styles/TabBarStyle';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const navigationRef = React.useRef(null);
  const [activePage, setActivePage] = React.useState('HomePage');

  // Function to navigate to the Home page
  const goToHome = () => {
    navigationRef.current?.navigate('HomePage');
    setActivePage('HomePage');
  };

  // Function to navigate to the Favorite page
  const goFavorite = () => {
    navigationRef.current?.navigate('FavoritePage');
    setActivePage('FavoritePage');
  };

  return (
    // Redux store provider
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {/* Stack navigator for different pages */}
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FavoritePage"
            component={FavoritePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FruitInfoPage"
            component={FruitInfoPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* Bottom tab navigation */}
      <View style={tabBarStyle.tabContainer}>
        <View style={tabBarStyle.tab}>
          {/* Home button */}
          <View>
            <TouchableOpacity onPress={goToHome} style={tabBarStyle.homeButtonContainer}>
              <Image source={require("./assets/homepage.png")} style={{ width: 24, height: 24, tintColor: activePage === 'HomePage' ? '#F4CD1E' : 'white' }} />
              <Text style={{ ...tabBarStyle.labelHome, color: activePage === 'HomePage' ? '#F4CD1E' : 'white' }}>Home</Text>
            </TouchableOpacity>
          </View>
          {/* Favorite button */}
          <View>
            <TouchableOpacity onPress={goFavorite} style={tabBarStyle.favoriteButtonContainer}>
              <Image source={require("./assets/star.png")} style={{ width: 24, height: 24, tintColor: activePage === 'FavoritePage' ? '#F4CD1E' : 'white' }} />
              <Text style={{ ...tabBarStyle.labelFavorite, color: activePage === 'FavoritePage' ? '#F4CD1E' : 'white' }}>Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
}
