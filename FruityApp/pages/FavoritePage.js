import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_FAVORITES, ADD_TO_FAVORITES, getFavoriteList } from "../utils/store";
import { useNavigation } from "@react-navigation/native";
import { homePageStyle } from "../styles/HomePageStyle";
import blackStar from "../assets/blackStar.png";
import yellowStar from "../assets/star.png";

export default function FavoritePage() {
    const dispatch = useDispatch();
    const favoriteList = useSelector(getFavoriteList);
    const navigation = useNavigation();
    const [sortedFavoriteList, setSortedFavoriteList] = useState([]);
    const [clickedItems, setClickedItems] = useState({});

    useEffect(() => {
        setSortedFavoriteList([...favoriteList].sort((a, b) => a.name.localeCompare(b.name)));
    }, [favoriteList]);

    const goToDetail = (fruit) => {
        navigation.navigate("FruitInfoPage", fruit);
    }

    const changeImage = (fruitId) => {
        setClickedItems((prevState) => ({
            ...prevState,
            [fruitId]: !prevState[fruitId],
        }));
        toggleFavorite(favoriteList.find(fruit => fruit.id === fruitId));
    };

    const toggleFavorite = (fruit) => {
        const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruit.id);

        if (!isAlreadyInFavorites) {
            dispatch({
                type: ADD_TO_FAVORITES,
                payload: fruit,
            });
            setClickedItems(prevState => ({
                ...prevState,
                [fruit.id]: true,
            }));
        } else {
            dispatch({
                type: REMOVE_FROM_FAVORITES,
                payload: fruit,
            });
            setClickedItems(prevState => ({
                ...prevState,
                [fruit.id]: false,
            }));
        }
    };

    const renderFruitItem = ({ item }) => {
        if (!item || !item.name) {
            return (
                <View style={homePageStyle.item}>
                    <Text>Error: Invalid fruit data</Text>
                </View>
            );
        }
    
        const isFavorited = clickedItems[item.id] || favoriteList.some(favorite => favorite.id === item.id);
        const activeImage = isFavorited ? yellowStar : blackStar;
    
        return (
            <View style={homePageStyle.item}>
                <TouchableOpacity onPress={() => goToDetail(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={homePageStyle.title}>{item.name}</Text>
                        <TouchableOpacity onPress={() => changeImage(item.id)}>
                            <Image
                                source={activeImage}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={homePageStyle.container}>
            <FlatList
                data={sortedFavoriteList}
                renderItem={renderFruitItem}
                keyExtractor={(item) => {
                    if (item && typeof item.id === 'number' && !isNaN(item.id)) {
                        return item.id.toString();
                    } else {
                        console.error('Invalid ID or item:', item);
                        // Return a default value or an alternative ID
                        return 'defaultId';
                    }
                }}
            />
        </View>
    );
}
