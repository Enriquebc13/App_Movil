import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CharactersView } from "./charactersView";
import { CharactersScrollView } from "./charactersScrollView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
 // Asegúrate de importarlo

const Tab = createBottomTabNavigator(); // Correcto, invocar como función

export default function NavigationCharacter() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "#0a0521",
                    paddingBottom: 5,
                    height: 60,
                },
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={CharactersView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={size} color={"white"} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Scroll" 
                component={CharactersScrollView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="note-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
