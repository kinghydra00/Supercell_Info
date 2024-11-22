import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { homeData } from "../data/homeData"; 
import HomeCard from "../components/HomeCard"; 
import Header from "../components/Header";

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header headerText={"Supercell Info"} flexPosition={"center"} />
            <FlatList
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                data={homeData} 
                renderItem={({ item }) => <HomeCard data={item} navigation={navigation} />}
                keyExtractor={(item) => item.id.toString()}  
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
    },
    button: {
        margin: 20,  
        padding: 20, 
    },
});

export default HomeScreen;
