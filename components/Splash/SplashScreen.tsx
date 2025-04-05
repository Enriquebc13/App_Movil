import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";

// Este componente es la pantalla de Splash
export function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    // Simula un retraso de 3 segundos antes de navegar
    setTimeout(() => {
      navigation.replace("MainApp"); // Cambia "MainApp" por el nombre de la pantalla principal en tu Drawer
    }, 3000); // 3 segundos
  }, [navigation]);

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />
      <Image
        source={require("../../assets/images/App.png")} // Asegúrate de tener una imagen
        style={styles.logo}
      />
      <Text style={styles.text}>Enrique Baez Cruz</Text>
      <Text style={styles.text}>Bienvenido a Mi App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Fondo oscuro
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    color: "#fff", // Texto blanco
    marginTop: 20,
  },
});
