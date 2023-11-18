import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export const tabBarStyle = {
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
    activeButtonBackground: 'black', // Change this to the desired active button background color
},
favoriteButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
},
labelHome: {
    color: "white"
},
labelFavorite: {
    color: "white"
}
};

export default function TabBar() {
  const [activePage, setActivePage] = useState('home');

  const goToHome = () => {
    setActivePage('home');
  };

  const goFavorite = () => {
    setActivePage('favorite');
  };

  return (
    <View style={tabBarStyle.tabContainer}>
      <View style={tabBarStyle.tab}>
        <View>
          <TouchableOpacity onPress={goToHome} style={{
            ...tabBarStyle.homeButtonContainer,
            backgroundColor: activePage === 'home' ? tabBarStyle.homeButtonContainer.backgroundColor : 'black',
          }}>
            <Image source={require('../assets/homepage.png')} style={{ width: 24, height: 24}} />
            <Text style={tabBarStyle.labelHome}>Home</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={goFavorite} style={{
            ...tabBarStyle.favoriteButtonContainer,
            backgroundColor: activePage === 'favorite' ? tabBarStyle.favoriteButtonContainer.backgroundColor : 'black',
          }}>
            <Image source={require('../assets/star.png')} style={{ width: 24, height: 24}} />
            <Text style={tabBarStyle.labelFavorite}>Favorite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
