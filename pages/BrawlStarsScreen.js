import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const BrawlStarsScreen = ({ navigation }) => {
  const [playerTag, setPlayerTag] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQyYzgwNjNkLWM1MjUtNDkwZC1hNmZjLWQ3YzZkNGYzYzUzZiIsImlhdCI6MTczMjI0NDEzMywic3ViIjoiZGV2ZWxvcGVyL2JiYWFkZDgzLWJkMjAtNjE1MS0zODExLTliYzc5NDM0ODMzZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTgyLjI1NS43LjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZTn9y8PA0E9hoMdXuO5qQJKz4QXCkFgSajvkVhePwrvjmTLMjkf9vE7RBpP6sRZjgSLqtUUEZERENPFRSD1smA"; // Ganti dengan API key Anda

  
  const fetchPlayerData = async () => {
    if (!playerTag) {
      Alert.alert("Error", "Please enter a player tag.");
      return;
    }

    setLoading(true);
    setPlayerData(null);
    try {
      const response = await axios.get(`https://api.brawlstars.com/v1/players/${encodeURIComponent(playerTag)}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setPlayerData(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch player data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Brawl Stars</Text>

      {/* Search bar */}
      <TextInput
        style={styles.input}
        placeholder="Enter Player Tag"
        value={playerTag}
        onChangeText={setPlayerTag}
      />
      <Button title="Search Player" onPress={fetchPlayerData} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {playerData && !loading && (
        <ScrollView style={styles.profileContainer}>
          {/* Display Icon */}
          {playerData.icon && (
            <Image
              source={{ uri: `https://api.brawlstars.com/v1/icons/${playerData.icon.id}` }}
              style={styles.playerIcon}
            />
          )}
          <Text style={styles.name}>{playerData.name}</Text>
          <Text style={styles.text}>Tag: {playerData.tag}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <Ionicons name="trophy" size={32} color="#FFD700" />
              <Text style={styles.statsText}>{playerData.trophies}</Text>
              <Text style={styles.labelText}>Trophies</Text>
            </View>
            <View style={styles.statsItem}>
              <Ionicons name="trophy" size={32} color="#FF5722" />
              <Text style={styles.statsText}>{playerData.highestTrophies}</Text>
              <Text style={styles.labelText}>Highest</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialIcons name="stars" size={32} color="#4CAF50" />
              <Text style={styles.statsText}>{playerData.expLevel}</Text>
              <Text style={styles.labelText}>Level</Text>
            </View>
          </View>

          {/* Club Information */}
          {playerData.club && (
            <View style={styles.clubContainer}>
              <Text style={styles.text}>
                <Ionicons name="people" size={18} color="#3F51B5" /> Club: {playerData.club.name}
              </Text>
              <Text style={styles.text}>Tag: {playerData.club.tag}</Text>

              {/* Button Detail Club */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (playerData.club.tag) {
                    navigation.navigate("ClubDetails", {
                      clubTag: playerData.club.tag,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>Detail Club</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* HIstory */}
          <View style={styles.statsList}>
            <Text style={styles.header}>History match</Text>
            <Text style={styles.text}>Solo Victories: {playerData.soloVictories}</Text>
            <Text style={styles.text}>Duo Victories: {playerData.duoVictories}</Text>
            <Text style={styles.text}>3vs3 Victories: {playerData["3vs3Victories"]}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// Styling
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
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loader: {
    marginTop: 20,
  },
  profileContainer: {
    marginTop: 20,
    width: "100%",
  },
  playerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "gray",
    marginVertical: 4,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  statsItem: {
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  labelText: {
    fontSize: 14,
    color: "gray",
  },
  clubContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  statsList: {
    marginTop: 16,
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BrawlStarsScreen;
