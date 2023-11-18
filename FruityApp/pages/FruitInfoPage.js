import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fruitInfoPageStyle } from "../styles/FruitInfoPageStyle";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../utils/store';
import { getFavoriteList } from '../utils/store';
import arrowLeft from '../assets/arrow_left.png';
import { useNavigation } from '@react-navigation/native';


export default function FruitInfoPage() {
    const dispatch = useDispatch();
    const route = useRoute();
    const fruitInfo = route.params;
    const navigation = useNavigation();

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

    const goBack = () => {
        navigation.goBack(); // Function to navigate back
    };

    // Check if the fruit is already in favorites to determine the star icon
    const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruitInfo.id);
    const starImage = isAlreadyInFavorites ? require('../assets/star.png') : require('../assets/blackStar.png');

    return (
        <View style={fruitInfoPageStyle.container}>
            <View style={fruitInfoPageStyle.header}>
                <View style={fruitInfoPageStyle.contentContainer}>
                    <TouchableOpacity style={fruitInfoPageStyle.imageContainer} onPress={goBack}>
                        <Image source={arrowLeft} style={fruitInfoPageStyle.imageStyle} />
                    </TouchableOpacity>
                    <View style={fruitInfoPageStyle.pageTitleContainer}>
                        <Text style={fruitInfoPageStyle.pageTitle}>Informations</Text>

                    </View>
                </View>

            </View>
            <View style={fruitInfoPageStyle.containerBox}>
                <View style={fruitInfoPageStyle.favoriteButton}>
                    <TouchableOpacity onPress={addOrRemoveFavorite}>
                        <Image source={starImage} style={{
                            width: 24,
                            height: 24
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={fruitInfoPageStyle.titleContainer}>
                    <Text style={fruitInfoPageStyle.title}>{fruitInfo.name}</Text>
                </View>
                <View style={fruitInfoPageStyle.lineContainer}>
                    <View style={fruitInfoPageStyle.line} />
                </View>
                <View style={fruitInfoPageStyle.familyContainer}>
                    <Text style={fruitInfoPageStyle.textStyle}>Family:</Text>
                    <Text style={fruitInfoPageStyle.textStyle}>{fruitInfo.family}</Text>
                </View>
                <View style={fruitInfoPageStyle.genusContainer}>
                    <Text style={fruitInfoPageStyle.textStyle}>Genus:</Text>
                    <Text style={fruitInfoPageStyle.textStyle}>{fruitInfo.genus}</Text>
                </View>
                <View style={fruitInfoPageStyle.orderContainer}>
                    <Text style={fruitInfoPageStyle.textStyle}>Order:</Text>
                    <Text style={fruitInfoPageStyle.textStyle}>{fruitInfo.order}</Text>
                </View>
                <View style={fruitInfoPageStyle.lineContainer}>
                <View style={fruitInfoPageStyle.line}/>
                </View>
                <View style={fruitInfoPageStyle.nutritionsContainerBox}>
                    <View style={fruitInfoPageStyle.nutritionsTitleContainer}>
                        <Text style={fruitInfoPageStyle.nutritionsTitle}>Nutritions</Text>
                    </View>
                    <View>
                        <View style={fruitInfoPageStyle.nutritionsContainer}>
                            <Text style={fruitInfoPageStyle.nutritions}>Calories:</Text>
                            <Text style={fruitInfoPageStyle.nutritions}>{fruitInfo.nutritions.calories}g</Text>
                        </View>
                        <View style={fruitInfoPageStyle.nutritionsContainer}>
                            <Text style={fruitInfoPageStyle.nutritions}>Carbohydrates:</Text>
                            <Text style={fruitInfoPageStyle.nutritions}>{fruitInfo.nutritions.carbohydrates}g</Text>
                        </View>
                        <View style={fruitInfoPageStyle.nutritionsContainer}>
                            <Text style={fruitInfoPageStyle.nutritions}>Fat:</Text>
                            <Text style={fruitInfoPageStyle.nutritions}>{fruitInfo.nutritions.fat}g</Text>
                        </View>
                        <View style={fruitInfoPageStyle.nutritionsContainer}>
                            <Text style={fruitInfoPageStyle.nutritions}>Protein:</Text>
                            <Text style={fruitInfoPageStyle.nutritions}>{fruitInfo.nutritions.protein}g</Text>
                        </View>
                        <View style={fruitInfoPageStyle.nutritionsContainer}>
                            <Text style={fruitInfoPageStyle.nutritions}>Sugar</Text>
                            <Text style={fruitInfoPageStyle.nutritions}>{fruitInfo.nutritions.sugar}g</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
