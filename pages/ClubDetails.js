import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const ClubDetailCard = ({ route, navigation }) => {
  const { clubTag } = route.params;
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQyYzgwNjNkLWM1MjUtNDkwZC1hNmZjLWQ3YzZkNGYzYzUzZiIsImlhdCI6MTczMjI0NDEzMywic3ViIjoiZGV2ZWxvcGVyL2JiYWFkZDgzLWJkMjAtNjE1MS0zODExLTliYzc5NDM0ODMzZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTgyLjI1NS43LjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZTn9y8PA0E9hoMdXuO5qQJKz4QXCkFgSajvkVhePwrvjmTLMjkf9vE7RBpP6sRZjgSLqtUUEZERENPFRSD1smA"; 

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.brawlstars.com/v1/clubs/${encodeURIComponent(clubTag)}`,
          {
            headers: { Authorization: `Bearer ${API_KEY}` },
          }
        );
        setClubData(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch club data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [clubTag]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {clubData && !loading && (
        <ScrollView style={styles.clubContainer}>
          {/* Gambar Badge Klub */}
          {clubData.badgeId && (
            <Image
              source={{
                uri: `https://api.brawlstars.com/v1/badges/${clubData.badgeId}`,
              }}
              style={styles.clubBadge}
            />
          )}
          
          {/* Nama Klub */}
          <Text style={styles.header}>{clubData.name}</Text>
          <Text style={styles.subHeader}>Tag: {clubData.tag}</Text>

          {/* Deskripsi Klub */}
          <Text style={styles.description}>{clubData.description}</Text>

          <View style={styles.clubStatsContainer}>
            <Text style={styles.clubStatsHeader}>Club Stats</Text>
            <View style={styles.clubStatsRow}>
              <View style={styles.statsItem}>
                <Ionicons name="trophy" size={32} color="#FFD700" />
                <Text style={styles.statsText}>{clubData.trophies}</Text>
                <Text style={styles.labelText}>Trophies</Text>
              </View>
              <View style={styles.statsItem}>
                <Ionicons name="trophy" size={32} color="#FF5722" />
                <Text style={styles.statsText}>{clubData.requiredTrophies}</Text>
                <Text style={styles.labelText}>Required Trophies</Text>
              </View>
            </View>
          </View>

          {/* Tipe Klub */}
          <View style={styles.clubTypeContainer}>
            <Text style={styles.clubTypeHeader}>tipe club : {clubData.type}</Text>
          </View>

          {/* Daftar Anggota Klub */}
          <View style={styles.membersContainer}>
            <Text style={styles.membersHeader}>Members:</Text>
            {clubData.members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <Image
                  source={{
                    uri: `https://api.brawlstars.com/v1/icons/${member.icon.id}`,
                  }}
                  style={styles.memberIcon}
                />
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberTrophies}>Trophies: {member.trophies}</Text>
                  <Text style={styles.memberRole}>Role: {member.role}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Tombol Kembali */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  loader: {
    marginTop: 20,
  },
  clubContainer: {
    marginTop: 20,
  },
  clubBadge: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3F51B5",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    color: "#3F51B5",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  clubStatsContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  clubStatsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  clubStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsItem: {
    alignItems: "center",
  },
  statsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 8,
  },
  labelText: {
    fontSize: 14,
    color: "gray",
  },
  clubTypeContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  clubTypeHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
    textAlign: "center",
  },
  clubTypeText: {
    fontSize: 16,
    color: "#3F51B5",
  },
  membersContainer: {
    marginTop: 16,
  },
  membersHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3F51B5",
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  memberIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberDetails: {
    marginLeft: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  memberTrophies: {
    fontSize: 14,
    color: "gray",
  },
  memberRole: {
    fontSize: 14,
    color: "#3F51B5",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3F51B5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ClubDetailCard;
