import React from 'react';
import { View, Text, Button, FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fruitInfoPageStyle } from "../styles/FruitInfoPageStyle";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../utils/store';
import { getFavoriteList } from '../utils/store';

const addFruitToFavorites = (fruit) => ({
    type: ADD_TO_FAVORITES,
    payload: fruit
});

export default function FruitInfoPage() {
    const dispatch = useDispatch();
    const route = useRoute();
    const fruitInfo = route.params;

    const favoriteList = useSelector(getFavoriteList);

    const addFavoriteList = () => {
        const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruitInfo.id);

        if (!isAlreadyInFavorites) {
            // Ajouter le fruit aux favoris s'il n'est pas déjà présent
            dispatch(addFruitToFavorites(fruitInfo));
        } else {
            // Retirer le fruit des favoris s'il est déjà présent
            dispatch({
                type: REMOVE_FROM_FAVORITES,
                payload: fruitInfo  // Transmettre uniquement l'élément à retirer
            });
        }
    }

    const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruitInfo.id);

    return (
        <View style={fruitInfoPageStyle.container}>
            <Text style={fruitInfoPageStyle.title}>{fruitInfo.name}</Text>
            <Text>Family: {fruitInfo.family}</Text>
            <Text>Genus: {fruitInfo.genus}</Text>
            <Text>Order: {fruitInfo.order}</Text>
            <Text>Nutritions: calories {fruitInfo.nutritions.calories}, carbohydrates {fruitInfo.nutritions.carbohydrates},  fat {fruitInfo.nutritions.fat}, protein {fruitInfo.nutritions.protein}, sugar {fruitInfo.nutritions.sugar}</Text>
            <Button
                title={isAlreadyInFavorites ? "Remove from favorites" : "Add to favorites"}
                onPress={addFavoriteList}
            />
        </View>
    )
}
