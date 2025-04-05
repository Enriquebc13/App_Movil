import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

//PANTALLAS
import HistorialScreen from "./historialScreen";
import RegistroScreen from "./registroScreen";

const Tab = createBottomTabNavigator();

export default function LocationNavigation() {
  return (
    
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0a0521", 
          },
          tabBarActiveTintColor: "white", 
          tabBarInactiveTintColor: "gray",
        })}
      >
       <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Registro"
        component={RegistroScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="location-on" color={color} size={size} />
          ),
        }}
      />
      </Tab.Navigator>
   
  );
}
