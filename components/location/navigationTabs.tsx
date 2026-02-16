import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// PANTALLAS
import HistorialScreen from "./historialScreen";
import RegistroScreen from "./registroScreen";

const Tab = createBottomTabNavigator();

// ======================
// TIPADO PARA ICONOS
// ======================
type IconProps = {
  color: string;
  size: number;
};

// ======================
// ICONOS FUERA DEL COMPONENTE
// ======================
const HistorialIcon = ({ color, size }: IconProps) => (
  <MaterialIcons name="history" color={color} size={size} />
);

const RegistroIcon = ({ color, size }: IconProps) => (
  <MaterialIcons name="location-on" color={color} size={size} />
);

// ======================
// COMPONENTE PRINCIPAL
// ======================
export default function LocationNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0a0521",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarIcon: HistorialIcon,
        }}
      />

      <Tab.Screen
        name="Registro"
        component={RegistroScreen}
        options={{
          tabBarIcon: RegistroIcon,
        }}
      />
    </Tab.Navigator>
  );
}
