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

  const goToHome = () => {
    navigationRef.current?.navigate('HomePage');
    setActivePage('HomePage');
  };

  const goFavorite = () => {
    navigationRef.current?.navigate('FavoritePage');
    setActivePage('FavoritePage');
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
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
      <View style={tabBarStyle.tabContainer}>
        <View style={tabBarStyle.tab}>
          <View>
            <TouchableOpacity onPress={goToHome} style={tabBarStyle.homeButtonContainer}>
              <Image source={require("./assets/homepage.png")} style={{ width: 24, height: 24, tintColor: activePage === 'HomePage' ? 'black' : 'white' }} />
              <Text style={{ ...tabBarStyle.labelHome, color: activePage === 'HomePage' ? 'black' : 'white' }}>Home</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={goFavorite} style={tabBarStyle.favoriteButtonContainer}>
              <Image source={require("./assets/star.png")} style={{ width: 24, height: 24, tintColor: activePage === 'FavoritePage' ? 'black' : 'white' }} />
              <Text style={{ ...tabBarStyle.labelFavorite, color: activePage === 'FavoritePage' ? 'black' : 'white' }}>Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
}
