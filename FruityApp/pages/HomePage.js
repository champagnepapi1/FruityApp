import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_FRUITS, FETCH_FRUITS_SUCCESS, REMOVE_FROM_FAVORITES, ADD_TO_FAVORITES, getFavoriteList, getFruitsList, getLoadingState } from '../utils/store';
import { homePageStyle } from '../styles/HomePageStyle';
import blackStar from "../assets/blackStar.png";
import yellowStar from "../assets/star.png";

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


    useEffect(() => {
        dispatch(fetchFruits());

        // Récupération des fruits depuis l'API
        fetch("https://www.fruityvice.com/api/fruit/all")
            .then(response => response.json())
            .then(data => {
                // Traitement des données pour les fruits
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
                // Gérer l'erreur de chargement des données ici
            });
        // Mise en place du titre de la page
    }, [dispatch, navigation]);

    useEffect(() => {
        if (fruitsList) {
            const filtered = fruitsList.filter((fruit) =>
                fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFruits(filtered);
        }
    }, [fruitsList, searchQuery]);

    useEffect(() => {
        // Check if each fruit is in the favoriteList and set its state accordingly
        const initialClickedItems = {};
        fruitsList.forEach(fruit => {
            const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruit.id);
            initialClickedItems[fruit.id] = isAlreadyInFavorites;
        });
        setClickedItems(initialClickedItems);
    }, [fruitsList, favoriteList]);

    const goToDetail = (fruit) => {
        // Redirection vers la page de détail du fruit
        navigation.navigate("FruitInfoPage", fruit);
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const changeImage = (fruitId) => {
        setClickedItems((prevState) => ({
            ...prevState,
            [fruitId]: !prevState[fruitId],
        }));
    };

    const renderFruitItem = ({ item }) => {
        if (!item || !item.name) {
            return (
                <View style={homePageStyle.item}>
                    <Text>Error: Invalid fruit data</Text>
                </View>
            );
        }

        const handleImageChange = () => {
            changeImage(item.id);
            toggleFavorite(item); // Function to add/remove item from favorites
        };

        const toggleFavorite = (fruit) => {
            const isAlreadyInFavorites = favoriteList.some(favorite => favorite.id === fruit.id);

            if (!isAlreadyInFavorites) {
                // Add the fruit to favorites if not already present
                dispatch(addFruitToFavorites(fruit));
                setClickedItems(prevState => ({
                    ...prevState,
                    [fruit.id]: true, // Set the clicked state to true
                }));
            } else {
                // Remove the fruit from favorites if already present
                dispatch({
                    type: REMOVE_FROM_FAVORITES,
                    payload: fruit,
                });
                setClickedItems(prevState => ({
                    ...prevState,
                    [fruit.id]: false, // Set the clicked state to false
                }));
            }
        };

        const activeImage = clickedItems[item.id] ? yellowStar : blackStar;

        return (
            <View style={homePageStyle.item}>
                <TouchableOpacity onPress={() => goToDetail(item)}>
                    <View style={homePageStyle.itemView}>
                        <Text style={homePageStyle.title}>{item.name}</Text>
                        <TouchableOpacity onPress={handleImageChange}>
                            <Image
                                source={activeImage}
                                style={homePageStyle.itemIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

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
            <View style={homePageStyle.searchInputContainer}>
                <TextInput
                    underlineColor='transparent'
                    style={homePageStyle.searchInput}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    placeholder="Search by name..."
                />
            </View>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
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
