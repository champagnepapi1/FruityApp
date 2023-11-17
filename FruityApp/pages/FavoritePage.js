import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { getFavoriteList } from "../utils/store";
import { useNavigation } from "@react-navigation/native";
import { homePageStyle } from "../styles/HomePageStyle";

export default function FavoritePage() {
    const favoriteList = useSelector(getFavoriteList);
    const navigation = useNavigation();

    const goToDetail = (fruit) => {
        navigation.navigate("FruitInfoPage", fruit);
    }

    const renderFruitItem = ({ item }) => {
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
            <FlatList
                data={favoriteList}
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
        </View>
    );
}
