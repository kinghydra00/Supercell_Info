import React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";

function ProfileScreen() {
  const profileData = {
    nama: "Fajri Arif Rasyid",
    nim: "21120122120003",
    imageUrl: "https://i.pinimg.com/736x/50/08/ef/5008efb9df96969624d2674645027a3a.jpg", 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Judul Profile */}
      <Text style={styles.header}>Profile</Text>

      {/*  profil IMG */}
      <Image
        source={{ uri: profileData.imageUrl }}
        style={styles.profileImage}
      />

      {/* Nama dan NIM */}
      <Text style={styles.name}>{profileData.nama}</Text>
      <Text style={styles.nim}>{profileData.nim}</Text>

      {/* Deskripsi */}
      <Text style={styles.description}>
        Fajri Arif Rasyid adalah seorang mahasiswa teknik komputer angkatan 2022
        dengan nim 21120122120003, dia adalah seorang laki-laki yang hobinya main
        game dan tidur. Namun karena ia diterima kuliah di UNDIP hidupnya mulai
        berubah.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",  
    alignItems: "center", 
    paddingTop: 180,  
    paddingBottom: 40,  
    backgroundColor: "#f9f9f9", 
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",  
    marginBottom: 20,
    textAlign: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 24, 
    borderWidth: 4, 
    borderColor: "#ddd", 
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  nim: {
    fontSize: 18,
    fontWeight: "400",
    color: "#777",
    marginBottom: 24, 
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    textAlign: "justify", 
    marginHorizontal: 20, 
    lineHeight: 24,
  },
});

export default ProfileScreen;
