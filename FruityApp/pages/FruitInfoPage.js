import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fruitInfoPageStyle } from "../styles/FruitInfoPageStyle";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../utils/store';
import { getFavoriteList } from '../utils/store';

export default function FruitInfoPage() {
    const dispatch = useDispatch();
    const route = useRoute();
    const fruitInfo = route.params;

    const favoriteList = useSelector(getFavoriteList);

    const addOrRemoveFavorite = () => {
        const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruitInfo.id);

        if (!isAlreadyInFavorites) {
            // Add the fruit to favorites if not already present
            dispatch({
                type: ADD_TO_FAVORITES,
                payload: fruitInfo
            });
        } else {
            // Remove the fruit from favorites if already present
            dispatch({
                type: REMOVE_FROM_FAVORITES,
                payload: fruitInfo
            });
        }
    }

    const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruitInfo.id);
    const starImage = isAlreadyInFavorites ? require('../assets/star.png') : require('../assets/blackStar.png');

    return (
        <View style={fruitInfoPageStyle.container}>
            <View>
                <TouchableOpacity onPress={addOrRemoveFavorite}>
                    <Image source={starImage} style={{
                        width: 24,
                        height: 24
                    }} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={fruitInfoPageStyle.title}>{fruitInfo.name}</Text>
            </View>
            <View>
                <Text>Family: {fruitInfo.family}</Text>
            </View>
            <View>
                <Text>Genus: {fruitInfo.genus}</Text>
            </View>
            <View>
                <Text>Order: {fruitInfo.order}</Text>
            </View>
            <View>
                <Text>Nutritions</Text>
            </View>
            <View>
                <View>
                    <Text>Calories:</Text>
                    <Text>{fruitInfo.nutritions.calories}</Text>
                </View>
                <View>
                    <Text>Carbohydrates:</Text>
                    <Text>{fruitInfo.nutritions.carbohydrates}</Text>
                </View>
                <View>
                    <Text>Fat:</Text>
                    <Text>{fruitInfo.nutritions.fat}</Text>
                </View>
                <View>
                    <Text>protein</Text>
                    <Text>{fruitInfo.nutritions.protein}</Text>
                </View>
                <View>
                    <Text>Sugar</Text>
                    <Text>{fruitInfo.nutritions.sugar}</Text>
                </View>
            </View>
        </View>
    )
}
