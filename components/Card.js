import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ dataNama }) => {
  const imageUrl = dataNama.imageUrl
    ? dataNama.imageUrl
    : "https://i.pinimg.com/736x/50/08/ef/5008efb9df96969624d2674645027a3a.jpg"; // Default jika tidak ada gambar
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{dataNama.nama}</Text>
          <Text style={styles.nim}>{dataNama.nim}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 300,
  },
  image: {
    width: 100,
    height: 100,
    borderRightWidth: 2,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderColor: "black",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 16,
    justifyContent: "center",
    maxWidth: 180,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  nim: {
    fontWeight: "400",
    color: "gray",
  },
});

export default Card;
