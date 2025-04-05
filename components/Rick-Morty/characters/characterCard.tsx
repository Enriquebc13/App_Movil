import { Image, StyleSheet, Text, View } from "react-native";
import { Character } from "./characterType";

// Definición del tipo Props
type Props = {
  character: Character; // Propiedad
};

export function CharacterCard({ character }: Props) {
  const getStatusColor = () => {
    switch (character.status) {
      case "Alive":
        return styles.alive;
      case "Dead":
        return styles.dead;
      case "Unknown":
        return styles.unknown;
      default:
        return styles.unknown;
    }
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: character.image }}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {character.name}
        </Text>

        <View style={styles.details}>
          <Text style={styles.label}>Estatus y especie:</Text>
          <View style={styles.row}>
            <View style={[styles.status, getStatusColor()]} />
            <Text style={styles.fieldValue}>
              {character.status} - {character.species}
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Origen:</Text>
        <Text style={styles.fieldValue}>
          {character.origin.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    flexDirection: "row",
    width: "100%",
    height: 160,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1e1e40", // Fondo oscuro
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "35%",
    height: "100%",
    borderRadius: 8,
    marginRight: 12,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: "#d1d1d1", // Gris claro para contrastar con el fondo oscuro
    fontWeight: "500",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
    color: "#ffd700", // Color dorado para resaltar el nombre
  },
  fieldValue: {
    fontSize: 14,
    color: "#fff", // Color blanco para los valores
  },
  details: {
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  alive: {
    backgroundColor: "#28a745", // Verde más brillante para "Alive"
  },
  dead: {
    backgroundColor: "#dc3545", // Rojo brillante para "Dead"
  },
  unknown: {
    backgroundColor: "#007bff", // Azul más brillante para "Unknown"
  },
});
