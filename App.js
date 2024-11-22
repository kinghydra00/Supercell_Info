import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import CoCScreen from "./pages/CoCScreen";
import BrawlStarsScreen from "./pages/BrawlStarsScreen";
import ClashRoyaleScreen from "./pages/ClashRoyaleScreen"; 
import ClubDetails from "./pages/ClubDetails";
import DetailClanScreen from "./pages/DetailClanScreen";
import LoginScreen from "./pages/LoginScreen";

const BottomTabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="ClashOfClans" component={CoCScreen} />
        <Stack.Screen name="BrawlStars" component={BrawlStarsScreen} />
        <Stack.Screen name="ClashRoyale" component={ClashRoyaleScreen} />
        <Stack.Screen name="ClubDetails" component={ClubDetails} />
        <Stack.Screen name="DetailClan" component={DetailClanScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 24,
          height: 44,
          marginBottom: 16,
          shadowOpacity: 0,
          elevation: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            color = focused ? "black" : "lightgray";
            return <Octicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "person";
            color = focused ? "black" : "lightgray";
            return <Octicons name={iconName} size={24} color={color} />;
          }
        },
        headerShown: false,
      })}
    >
      <BottomTabNavigator.Screen name="Home" component={HomeScreen} />
      <BottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
    </BottomTabNavigator.Navigator>
  );
}

export default App;
