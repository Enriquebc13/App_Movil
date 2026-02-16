import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EpisodesView } from "./episodesView";
import { EpisodesScrollView } from "./episodesScrollView";

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
const HomeTabIcon = ({ color, size }: IconProps) => (
  <MaterialCommunityIcons name="home" size={size} color={color} />
);

const ScrollTabIcon = ({ color, size }: IconProps) => (
  <MaterialCommunityIcons name="note-outline" size={size} color={color} />
);

// ======================
// COMPONENTE PRINCIPAL
// ======================
export default function NavigationEpisodes(): JSX.Element {
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
        component={EpisodesView}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />

      <Tab.Screen
        name="Scroll"
        component={EpisodesScrollView}
        options={{
          tabBarIcon: ScrollTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
