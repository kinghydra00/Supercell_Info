import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, ScrollView, Image } from "react-native";
import axios from "axios";

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRhNWE5ZDVkLWE4YjgtNDFjYS1hNDlhLTAzNzZiMGRiY2ZlNyIsImlhdCI6MTczMjI0NDA3Miwic3ViIjoiZGV2ZWxvcGVyLzdmZjM5YWVhLThjNzEtZjU1Zi0zMmE5LTc5YjM4NzVmYWI4NiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODIuMjU1LjcuNSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.WV3PEWQsz_TCA7HlwiGNpNlqoVV5YBtL-4yVf6tKFybKju8pcsT45ymxn4zrcTQPte9cAVGIR_oG-6ttvLmEQg"; // Replace with your Clash Royale API key

function ClashRoyaleScreen() {
    const [playerTag, setPlayerTag] = useState("");
    const [playerData, setPlayerData] = useState(null);
    const [allCards, setAllCards] = useState([]);
    const [ownedCards, setOwnedCards] = useState([]);
    const [missingCards, setMissingCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const response = await axios.get(
                    "https://api.clashroyale.com/v1/cards",
                    {
                        headers: {
                            Authorization: `Bearer ${API_KEY}`,
                        },
                    }
                );
                setAllCards(response.data.items);
            } catch (error) {
                Alert.alert("Error", "Failed to fetch all cards data: " + error.message);
            }
        };

        fetchAllCards();
    }, []);

    const fetchPlayerData = async () => {
        if (!playerTag) {
            Alert.alert("Error", "Please enter a player tag.");
            return;
        }

        setLoading(true);
        setPlayerData(null); 
        setOwnedCards([]);
        setMissingCards([]);
        try {
            const response = await axios.get(
                `https://api.clashroyale.com/v1/players/${encodeURIComponent(playerTag)}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            setPlayerData(response.data);

            const owned = response.data.cards || [];
            const missing = allCards.filter((card) => !owned.some((ownedCard) => ownedCard.id === card.id));

            setOwnedCards(owned);
            setMissingCards(missing);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch Clash Royale player data: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Clash Royale</Text>

            {/* search bar */}
            <TextInput
                style={styles.input}
                placeholder="Enter Player Tag"
                value={playerTag}
                onChangeText={setPlayerTag}
            />
            <Button title="Search Player" onPress={fetchPlayerData} />

            {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

            {playerData && !loading && (
                <View style={styles.card}>
                    {/* Player Information */}
                    <Text style={styles.cardHeader}>Player Information</Text>
                    <Text style={styles.name}>Name: {playerData.name}</Text>
                    <Text style={styles.tag}>Tag: {playerData.tag}</Text>
                    <Text style={styles.trophies}>Trophies: {playerData.trophies}</Text>

                    {/* Arena Information */}
                    <Text style={styles.cardHeader}>Arena</Text>
                    <Text style={styles.arena}>Arena: {playerData.arena?.name}</Text>

                    {/* Clan Information */}
                    <Text style={styles.cardHeader}>Clan</Text>
                    {playerData.clan ? (
                        <View>
                            <Text style={styles.clan}>Clan: {playerData.clan.name}</Text>
                            <Text style={styles.clanTag}>Clan Tag: {playerData.clan.tag}</Text>
                        </View>
                    ) : (
                        <Text style={styles.noClan}>No Clan</Text>
                    )}

                    {/* Show Owned Cards */}
                    {ownedCards.length > 0 && (
                        <View style={styles.itemsContainer}>
                            <Text style={styles.cardHeader}>Owned Cards</Text>
                            {ownedCards.map((card) => (
                                <View key={card.id} style={styles.item}>
                                    <Image
                                        source={{ uri: card.iconUrls?.medium }}
                                        style={styles.itemIcon}
                                    />
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.itemName}>{card.name}</Text>
                                        <Text style={styles.itemDetails}>Level: {card.level}</Text>
                                        <Text style={styles.itemDetails}>Rarity: {card.rarity}</Text>
                                        <Text style={styles.itemDetails}>Max Level: {card.maxLevel}</Text>
                                        <Text style={styles.itemDetails}>Elixir Cost: {card.elixirCost}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Show Missing Cards */}
                    {missingCards.length > 0 && (
                        <View style={styles.itemsContainer}>
                            <Text style={styles.cardHeader}>Missing Cards</Text>
                            {missingCards.map((card) => (
                                <View key={card.id} style={styles.item}>
                                    <Image
                                        source={{ uri: card.iconUrls?.medium }}
                                        style={styles.itemIcon}
                                    />
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.itemName}>{card.name}</Text>
                                        <Text style={styles.itemDetails}>Rarity: {card.rarity}</Text>
                                        <Text style={styles.itemDetails}>Max Level: {card.maxLevel}</Text>
                                        <Text style={styles.itemDetails}>Elixir Cost: {card.elixirCost}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#3F51B5",
    },
    input: {
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    loader: {
        marginVertical: 16,
    },
    card: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop: 20,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#3F51B5",
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    tag: {
        fontSize: 16,
        color: "gray",
        marginBottom: 4,
    },
    trophies: {
        fontSize: 16,
        color: "orange",
        marginBottom: 4,
    },
    arena: {
        fontSize: 16,
        color: "blue",
        marginBottom: 4,
    },
    clan: {
        fontSize: 16,
        color: "purple",
    },
    clanTag: {
        fontSize: 14,
        color: "gray",
        marginTop: 2,
    },
    noClan: {
        fontSize: 16,
        color: "red",
        marginTop: 4,
    },
    itemsContainer: {
        marginTop: 16,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        padding: 8,
        backgroundColor: "#f7f7f7",
        borderRadius: 8,
    },
    itemIcon: {
        width: 80,
        height: 120,
        marginRight: 12,
    },
    cardDetails: {
        flexDirection: "column",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "600",
    },
    itemDetails: {
        fontSize: 14,
        color: "gray",
    },
});

export default ClashRoyaleScreen;
