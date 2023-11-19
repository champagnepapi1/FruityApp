import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, List, TextInput, ActivityIndicator } from 'react-native-paper';
import { FETCH_FRUITS, FETCH_FRUITS_SUCCESS, REMOVE_FROM_FAVORITES, ADD_TO_FAVORITES, getFavoriteList, getFruitsList, getLoadingState } from '../utils/store';
import { homePageStyle } from '../styles/HomePageStyle';
import blackStar from "../assets/blackStar.png";
import yellowStar from "../assets/star.png";

// Action creators
const fetchFruits = () => ({
    type: FETCH_FRUITS,
});

const fetchFruitsSuccess = (fruits) => ({
    type: FETCH_FRUITS_SUCCESS,
    payload: fruits,
});

const addFruitToFavorites = (fruit) => ({
    type: ADD_TO_FAVORITES,
    payload: fruit
});

export default function HomePage() {
    const dispatch = useDispatch();
    const fruitsList = useSelector(getFruitsList);
    const favoriteList = useSelector(getFavoriteList);
    const loading = useSelector(getLoadingState);
    const navigation = useNavigation();
    const [clickedItems, setClickedItems] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFruits, setFilteredFruits] = useState([]);
    const sortedFruits = filteredFruits.length > 0 ? filteredFruits : fruitsList;

    // Fetch fruits from API and handle data
    useEffect(() => {
        dispatch(fetchFruits());

        fetch("https://www.fruityvice.com/api/fruit/all")
            .then(response => response.json())
            .then(data => {
                const mappedFruit = data.map((fruit) => ({
                    name: fruit.name || null,
                    id: fruit.id || null,
                    family: fruit.family || null,
                    genus: fruit.genus || null,
                    order: fruit.order || null,
                    nutritions: fruit.nutritions || null
                }));
                dispatch(fetchFruitsSuccess(mappedFruit));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                // Handle data fetching error here
            });
    }, [dispatch, navigation]);

    // Filter fruits based on search query
    useEffect(() => {
        if (fruitsList) {
            const filtered = fruitsList.filter((fruit) =>
                fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFruits(filtered);
        }
    }, [fruitsList, searchQuery]);

    // Set initial favorite status of fruits
    useEffect(() => {
        const initialClickedItems = {};
        fruitsList.forEach(fruit => {
            const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruit.id);
            initialClickedItems[fruit.id] = isAlreadyInFavorites;
        });
        setClickedItems(initialClickedItems);
    }, [fruitsList, favoriteList]);

    // Navigate to fruit details page
    const goToDetail = (fruit) => {
        navigation.navigate("FruitInfoPage", fruit);
    }

    // Handle search input
    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    // Change favorite icon and toggle favorite status
    const changeImage = (fruitId) => {
        setClickedItems((prevState) => ({
            ...prevState,
            [fruitId]: !prevState[fruitId],
        }));
    };

    // Render each fruit item
    const renderFruitItem = ({ item }) => {
        const toggleFavorite = (fruit) => {
            const isAlreadyInFavorites = favoriteList.some((favorite) => favorite.id === fruit.id);

            if (!isAlreadyInFavorites) {
                dispatch(addFruitToFavorites(fruit));
                setClickedItems((prevState) => ({
                    ...prevState,
                    [fruit.id]: true,
                }));
            } else {
                dispatch({
                    type: REMOVE_FROM_FAVORITES,
                    payload: fruit,
                });
                setClickedItems((prevState) => ({
                    ...prevState,
                    [fruit.id]: false,
                }));
            }
        };

        const handleImageChange = () => {
            changeImage(item.id);
            toggleFavorite(item);
        };

        if (!item || !item.name) {
            return (
                <View style={homePageStyle.item}>
                    <Text>Error: Invalid fruit data</Text>
                </View>
            );
        }

        return (
            <List.Item
                title={item.name}
                onPress={() => goToDetail(item)}
                right={() => (
                    <TouchableOpacity onPress={handleImageChange}>
                        <Image
                            source={clickedItems[item.id] ? yellowStar : blackStar}
                            style={homePageStyle.itemIcon}
                        />
                    </TouchableOpacity>
                )}
                style={homePageStyle.item}
                titleStyle={homePageStyle.title}
            />
        );
    };

    // Sort fruits by name
    const compareByName = (a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    };

    sortedFruits.sort(compareByName);

    return (
        <View style={homePageStyle.container}>
            <Appbar.Header style={homePageStyle.pageTitleContainer}>
                <Appbar.Content title="Home" titleStyle={homePageStyle.pageTitle} />
            </Appbar.Header>
            <View style={homePageStyle.searchInputContainer}>
                <TextInput
                    underlineColor='transparent'
                    style={homePageStyle.searchInput}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    placeholder="Search by name..."
                    placeholderTextColor="#2C1605"
                />
            </View>

            {loading ? (
                // Show ActivityIndicator while loading
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={true} size="large" />
                </View>
            ) : (
                // Render FlatList with sortedFruits
                <FlatList
                    data={sortedFruits}
                    renderItem={renderFruitItem}
                    keyExtractor={(item) => {
                        if (item && typeof item.id === 'number' && !isNaN(item.id)) {
                            return item.id.toString();
                        } else {
                            console.error('Invalid ID or item:', item);
                            return 'defaultId';
                        }
                    }}
                />
            )}
        </View>
    );
}
