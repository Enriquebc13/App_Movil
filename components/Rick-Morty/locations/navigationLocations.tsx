import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LocationsScrollView } from "./locationsScrollView";
import { LocationsView } from "./locationsView";

 // Asegúrate de importarlo

const Tab = createBottomTabNavigator<any>(); // Correcto, invocar como función

export default function LocationNavegacion() {
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
                component={LocationsView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={size} color={"white"} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Scroll" 
                component={LocationsScrollView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="note-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
