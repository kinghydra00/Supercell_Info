import { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { townHallData } from "../data/townHallData"; // Assuming you have the townHallData as an array of town hall levels and image URLs

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdjNjgwMjhlLWViODItNDJmOS1hNTBjLTQ0YjEyZTFlNWQwNiIsImlhdCI6MTczMjI0Mzk5Niwic3ViIjoiZGV2ZWxvcGVyLzFkMTJkM2FhLTg0NzEtY2E4Yi00ZGE2LTUzZDhhMjRiMWExMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4yNTUuNy41Il0sInR5cGUiOiJjbGllbnQifV19.jC7AUzoNkGLcta5TXwHbtBrjN-rbvfAMbs3UptsG3zEYXLDyPg39sOBEBc_wJzLlWHndfiIjPplFxZoCKs8eyQ"; // Replace with your actual API key

function DetailClanScreen({ route }) {
    const { clanTag } = route.params; // Get clanTag passed from CoCScreen
    const [clanData, setClanData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchClanData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            setClanData(response.data);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch clan data: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getTownHallImage = (level) => {
        const townHall = townHallData.find((item) => item.level === level);
        return townHall ? townHall.imageUrl : null; 
    };

    useEffect(() => {
        fetchClanData();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : clanData ? (
                <ScrollView style={styles.content}>
                    <Image source={{ uri: clanData.badgeUrls.medium }} style={styles.clanBadge} />
                    
                    {/* Clan Information */}
                    <View style={styles.clanInfoContainer}>
                        <Text style={styles.clanName}>{clanData.name}</Text>
                        <Text style={styles.clanTag}>Tag: {clanData.tag}</Text>

                        {/* Clan Stats */}
                        <Text style={styles.clanInfo}>Members: {clanData.members} / 50</Text>
                        <Text style={styles.clanInfo}>Clan Level: {clanData.clanLevel}</Text>

                        {/* War Stats */}
                        <Text style={styles.clanInfo}>War Win Streak: {clanData.warWinStreak}</Text>
                        <Text style={styles.clanInfo}>War Wins: {clanData.warWins}</Text>
                        <Text style={styles.clanInfo}>War Ties: {clanData.warTies}</Text>
                        <Text style={styles.clanInfo}>War Losses: {clanData.warLosses}</Text>
                        <Text style={styles.clanInfo}>Clan Points: {clanData.clanPoints}</Text>
                    </View>

                    {/* Members List */}
                    <Text style={styles.membersTitle}>Members:</Text>
                    {clanData.memberList.map((member, index) => (
                        <View key={index} style={styles.memberCard}>
                            <Text style={styles.memberName}>{member.name}</Text>
                            <Text style={styles.memberTag}>{member.tag}</Text>

                            {/* League member */}
                            {member.league && member.league.name && (
                                <View style={styles.leagueContainer}>
                                    <Text style={styles.memberLeague}>League: {member.league.name}</Text>
                                    <Image
                                        source={{
                                            uri: member.league.iconUrls.small, 
                                        }}
                                        style={styles.leagueIcon}
                                    />
                                </View>
                            )}

                            {/* Town Hall Level member */}
                            {member.townHallLevel && (
                                <View style={styles.townHallContainer}>
                                    <Text style={styles.townHall}>Town Hall Level: {member.townHallLevel}</Text>
                                    <Image
                                        source={{
                                            uri: getTownHallImage(member.townHallLevel),
                                        }}
                                        style={styles.townHallIcon}
                                    />
                                </View>
                            )}

                            {/* Role member */}
                            {member.role && (
                                <Text style={styles.memberRole}>Role: {member.role}</Text>
                            )}
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.infoText}>No clan data available.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Lighter background color for better contrast
        padding: 16,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        marginTop: 20,
    },
    clanBadge: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginVertical: 16,
        borderRadius: 8, // Rounded corners for the badge
    },
    clanInfoContainer: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000", // Shadow for a card effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
    clanName: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 8,
    },
    clanTag: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    clanInfo: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 4,
    },
    membersTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 16,
        textAlign: "center",
    },
    memberCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000", // Shadow for member card
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    memberName: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    memberTag: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
    },
    leagueContainer: {
        alignItems: "center",
        marginTop: 12, // Ensure there is space between league and other elements
    },
    memberLeague: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    leagueIcon: {
        width: 30,
        height: 30,
        marginTop: 8,
    },
    townHallContainer: {
        alignItems: "center",
        marginTop: 8,
    },
    townHall: {
        fontSize: 16,
        color: "green",
    },
    townHallIcon: {
        width: 50,
        height: 50,
        marginTop: 8,
    },
    memberRole: {
        fontSize: 16,
        color: "#007BFF", // Role color for visibility
        textAlign: "center",
        marginTop: 8,
    },
    infoText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
});

export default DetailClanScreen;
