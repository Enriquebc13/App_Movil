import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Text, View, ActivityIndicator } from "react-native";

// ======================
// PANTALLAS
// ======================
import Permisos from "./permisos/permisos";
import Galeria from "./Galeria/Galery";
import Perfil from "./Perfil/perfil";
import Location from "./Location/location";
import NavigationTabs from "./Location/navigation";
import Login from "./login/login";
import Home from "./home/home";
import About from "./about/about";
import Notas from "./notas/notas";
import RickAndMorty from "./Rick and Morty/Rick and Morty";
import Character from "./Rick and Morty/character/character";
import Episodes from "./Rick and Morty/episodes/episodes";
import Locacion2 from "./Rick and Morty/Locacion/locacion";
import { SplashScreen } from "@/components/Splash/SplashScreen";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator<any>();

// ======================
// TIPADO PARA ICONOS
// ======================
type IconProps = {
  color: string;
  size: number;
};

// ======================
// ICONOS (FUERA DEL COMPONENTE PRINCIPAL)
// ======================
const HomeIcon = ({ color, size }: IconProps) => (
  <MaterialCommunityIcons name="home" size={size} color={color} />
);

const PerfilIcon = ({ color, size }: IconProps) => (
  <Feather name="user" size={size} color={color} />
);

const LocationIcon = ({ color, size }: IconProps) => (
  <Entypo name="location-pin" size={size} color={color} />
);

const GaleriaIcon = ({ color, size }: IconProps) => (
  <Entypo name="folder-images" size={size} color={color} />
);

const RickIcon = ({ color, size }: IconProps) => (
  <FontAwesome name="mobile-phone" size={size} color={color} />
);

const NotasIcon = ({ color, size }: IconProps) => (
  <MaterialIcons name="notes" size={size} color={color} />
);

const PermisosIcon = ({ color, size }: IconProps) => (
  <MaterialIcons name="app-blocking" size={size} color={color} />
);

const HistoryIcon = ({ color, size }: IconProps) => (
  <MaterialIcons name="history" size={size} color={color} />
);

const AboutIcon = ({ color, size }: IconProps) => (
  <AntDesign name="infocirlce" size={size} color={color} />
);

const LoginIcon = ({ color, size }: IconProps) => (
  <Entypo name="login" size={size} color={color} />
);

// ======================
// COMPONENTE PRINCIPAL
// ======================
export default function Navegacion() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "Estado de autenticación:",
        user ? "Autenticado" : "No autenticado"
      );
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (isSplashVisible) {
    return (
      <SplashScreen
        navigation={{
          replace: (screen: string) =>
            console.log(`Navigating to: ${screen}`),
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0a0521" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0a0521" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        drawerStyle: {
          backgroundColor: "rgba(0, 0, 10, 0.8)",
          width: 230,
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#bbb",
        drawerLabelStyle: {
          fontSize: 20,
          marginTop: 10,
          fontWeight: "bold",
        },
      }}
    >
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: HomeIcon }} />
          <Drawer.Screen name="Perfil" component={Perfil} options={{ drawerIcon: PerfilIcon }} />
          <Drawer.Screen name="Locacion" component={Location} options={{ drawerIcon: LocationIcon }} />
          <Drawer.Screen name="Galeria" component={Galeria} options={{ drawerIcon: GaleriaIcon }} />
          <Drawer.Screen name="Rick and Morty" component={RickAndMorty} options={{ drawerIcon: RickIcon }} />
          <Drawer.Screen name="Notas" component={Notas} options={{ drawerIcon: NotasIcon }} />
          <Drawer.Screen name="Permisos" component={Permisos} options={{ drawerIcon: PermisosIcon }} />
          <Drawer.Screen
            name="Historial"
            component={NavigationTabs}
            options={{
              drawerItemStyle: { display: "none" },
              drawerIcon: HistoryIcon,
            }}
          />
          <Drawer.Screen name="About" component={About} options={{ drawerIcon: AboutIcon }} />
          <Drawer.Screen
            name="Personajes"
            component={Character}
            options={{
              drawerItemStyle: { display: "none" },
              drawerIcon: AboutIcon,
            }}
          />
          <Drawer.Screen
            name="Episodios"
            component={Episodes}
            options={{
              drawerItemStyle: { display: "none" },
              drawerIcon: AboutIcon,
            }}
          />
          <Drawer.Screen
            name="Locaciones"
            component={Locacion2}
            options={{
              drawerItemStyle: { display: "none" },
              drawerIcon: AboutIcon,
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} options={{ drawerIcon: LoginIcon }} />
          <Drawer.Screen name="About" component={About} options={{ drawerIcon: AboutIcon }} />
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
