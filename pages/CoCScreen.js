import { useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";
import { townHallData } from "../data/townHallData";

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdjNjgwMjhlLWViODItNDJmOS1hNTBjLTQ0YjEyZTFlNWQwNiIsImlhdCI6MTczMjI0Mzk5Niwic3ViIjoiZGV2ZWxvcGVyLzFkMTJkM2FhLTg0NzEtY2E4Yi00ZGE2LTUzZDhhMjRiMWExMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4yNTUuNy41Il0sInR5cGUiOiJjbGllbnQifV19.jC7AUzoNkGLcta5TXwHbtBrjN-rbvfAMbs3UptsG3zEYXLDyPg39sOBEBc_wJzLlWHndfiIjPplFxZoCKs8eyQ"; // Replace with your actual API key

function CoCScreen({ navigation }) {
    const [playerTag, setPlayerTag] = useState("");
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPlayerData = async () => {
        if (!playerTag) {
            Alert.alert("Error", "Please enter a player tag.");
            return;
        }

        setLoading(true);
        setPlayerData(null);
        try {
            const response = await axios.get(
                `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            setPlayerData(response.data);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch Clash of Clans player data: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getTownHallImage = (level) => {
        const townHall = townHallData.find((item) => item.level === level);
        return townHall ? townHall.imageUrl : null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Clash of Clans</Text>

            {/* search bar */}
            <TextInput
                style={styles.input}
                placeholder="Enter Player Tag"
                value={playerTag}
                onChangeText={setPlayerTag}
            />
            <Button title="Search Player" onPress={fetchPlayerData} />

            {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

            {playerData && (
                <ScrollView style={styles.content}>
                    <Text style={styles.name}>{playerData.name}</Text>
                    <Text style={styles.tag}>Tag: {playerData.tag}</Text>

                    {/* League Information */}
                    {playerData.league && (
                        <View style={styles.leagueContainer}>
                            <Image
                                source={{ uri: playerData.league.iconUrls.medium }}
                                style={styles.leagueIcon}
                            />
                            <Text style={styles.leagueName}>{playerData.league.name}</Text>
                        </View>
                    )}

                    {/* Town Hall */}
                    <View style={styles.townHallContainer}>
                        <Text style={styles.townHall}>Town Hall Level: {playerData.townHallLevel}</Text>
                        {playerData.townHallLevel && (
                            <Image
                                source={{
                                    uri: getTownHallImage(playerData.townHallLevel),
                                }}
                                style={styles.townHallIcon}
                            />
                        )}
                    </View>

                    <Text style={styles.trophies}>Trophies: {playerData.trophies}</Text>
                    <Text style={styles.bestTrophies}>Best Trophies: {playerData.bestTrophies}</Text>

                    {/* Clan Information */}
                    {playerData.clan && (
                        <View style={styles.clanContainer}>
                            <Image
                                source={{ uri: playerData.clan.badgeUrls.medium }}
                                style={styles.clanIcon}
                            />
                            <Text style={styles.clanName}>{playerData.clan.name}</Text>
                            <Text style={styles.clanTag}>Clan Tag: {playerData.clan.tag}</Text>
                            {/* Navigate to DetailClan screen */}
                            <Button
                                title="View Clan Details"
                                onPress={() => navigation.navigate("DetailClan", { clanTag: playerData.clan.tag })}
                            />
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "80%", 
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16, 
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        marginTop: 20,
        width: "100%", 
    },
    name: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 8,
    },
    tag: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    leagueContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
    },
    leagueIcon: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    leagueName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    townHallContainer: {
        alignItems: "center",
        marginVertical: 16,
    },
    townHall: {
        fontSize: 18,
        color: "green",
        textAlign: "center",
    },
    townHallIcon: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
    trophies: {
        fontSize: 16,
        color: "blue",
        textAlign: "center",
    },
    bestTrophies: {
        fontSize: 16,
        color: "purple",
        textAlign: "center",
    },
    clanContainer: {
        alignItems: "center",
        marginVertical: 16,
    },
    clanIcon: {
        width: 50,
        height: 50,
    },
    clanName: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    clanTag: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginBottom: 16,
    },
});

export default CoCScreen;
