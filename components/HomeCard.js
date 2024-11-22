import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function HomeCard({ data, navigation }) {
    const handlePress = () => {
        if (data.title === "Clash Of Clans") {
            navigation.navigate("ClashOfClans");
        } else if (data.title === "Brawl Stars") {
            navigation.navigate("BrawlStars");
        } else if (data.title === "Clash Royale") {
            navigation.navigate("ClashRoyale");
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <Image source={{ uri: data.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column", 
        backgroundColor: "white",
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 300,   
        height: 150,  
        borderRadius: 8, 
        marginBottom: 12, 
        alignSelf: "center", 
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center", 
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "gray",
        textAlign: "center", 
    },
});

export default HomeCard;
