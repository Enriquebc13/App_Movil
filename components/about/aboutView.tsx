import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function AboutView() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/logo2.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Text style={styles.description}>
        Esta aplicación ha sido desarrollada para ayudar a los usuarios a gestionar
        sus imágenes, ubicación y perfil de manera eficiente. Con una interfaz
        intuitiva, permite capturar, visualizar y administrar información de forma
        sencilla.
      </Text>
      <Text style={styles.subtitle}>Características:</Text>
      <Text style={styles.listItem}>• Captura y visualización de imágenes.</Text>
      <Text style={styles.listItem}>• Gestión de ubicación y permisos.</Text>
      <Text style={styles.listItem}>• Actualización de perfil(Fotografia).</Text>
      <Text style={styles.listItem}>• Integración con Firebase Authentication.</Text>
      <Text style={styles.listItem}>• Acceso rápido y sencillo a las funcionalidades.</Text>
      <Text style={styles.listItem}>• Integración con la API de Rick and Morty para obtener personajes, episodios y ubicaciones.</Text>
      <Text style={styles.listItem}>
        • Los datos obtenidos incluyen información detallada sobre cada personaje y episodio, como su nombre, imagen y ubicación.
      </Text>
      <Text style={styles.footer}>Desarrollado por Enrique Baez - 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0a0521",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  listItem: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 10,
    textAlign: "center",
  },
  footer: {
    fontSize: 16,
    color: "grey",
    marginTop: 30,
    textAlign: "center",
  },
});
