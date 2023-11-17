import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_FRUITS, FETCH_FRUITS_SUCCESS } from '../utils/store';
import { homePageStyle } from '../styles/HomePageStyle';
import { getFruitsList, getLoadingState } from '../utils/store';

const fetchFruits = () => ({
    type: FETCH_FRUITS,
});

const fetchFruitsSuccess = (fruits) => ({
    type: FETCH_FRUITS_SUCCESS,
    payload: fruits,
});

export default function HomePage() {
    const dispatch = useDispatch();
    const fruitsList = useSelector(getFruitsList);
    const loading = useSelector(getLoadingState);
    const navigation = useNavigation();

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
        navigation.setOptions({
            title: 'Home'
        });
    }, [dispatch, navigation]);

    const goToDetail = (fruit) => {
        // Redirection vers la page de détail du fruit
        navigation.navigate("FruitInfoPage", fruit);
    }

    const renderFruitItem = ({ item }) => {
        // Rendu de chaque élément de la liste des fruits
        if (!item || !item.name) {
            return (
                <View style={homePageStyle.item}>
                    <Text>Error: Invalid fruit data</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity onPress={() => goToDetail(item)} style={homePageStyle.item}>
                <View>
                    <Text style={homePageStyle.title}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={homePageStyle.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                fruitsList && fruitsList.length > 0 ? (
                    <FlatList
                        data={fruitsList}
                        renderItem={renderFruitItem}
                        keyExtractor={(item) => {
                            if (item && typeof item.id === 'number' && !isNaN(item.id)) {
                                return item.id.toString();
                            } else {
                                console.error('Invalid ID or item:', item);
                                // Retourner une valeur par défaut ou un ID alternatif
                                return 'defaultId';
                            }
                        }}
                    />
                ) : (
                    <Text>No fruits available</Text>
                )
            )}
        </View>
    );
}
