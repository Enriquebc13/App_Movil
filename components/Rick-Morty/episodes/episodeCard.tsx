import { Image, StyleSheet, Text, View } from "react-native";
import { Episode } from "./episodeType";

// Definición del tipo Props
type Props = {
    episode: Episode; // Propiedad
}

export function EpisodeCard({ episode }: Props) {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={require("../../../assets/images/RICK AND MORTY.png")}
            />

            <View style={styles.content}>
                <Text style={styles.name}>{episode.name}</Text>

                <View style={styles.detail}>
                    <Text style={styles.label}>Clave:</Text>
                    <Text style={styles.fieldValue}>{episode.episode}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.label}>Emisión:</Text>
                    <Text style={styles.fieldValue}>{episode.air_date}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.label}>Participantes:</Text>
                    <Text style={styles.fieldValue}>{episode.characters.length}</Text> {/* Contar número de participantes */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 200,
        borderWidth: 1,
        borderColor: "#444",
        backgroundColor: "#1e1123", // Fondo oscuro
        padding: 12,
        marginVertical: 8,
        elevation: 5, // Sombra sutil para mejorar la visibilidad
    },
    image: {
        width: "40%",
        height: "100%",
        borderRadius: 10,
        resizeMode: "cover",
    },
    content: {
        paddingLeft: 12,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    label: {
        fontSize: 14,
        color: "#fff", // Color blanco para las etiquetas
        fontWeight: "bold",
    },
    name: {
        fontWeight: "700",
        fontSize: 18,
        color: "#fff", // Nombre del episodio en blanco
        marginBottom: 6,
    },
    fieldValue: {
        fontSize: 14,
        color: "#ddd", // Color gris claro para los valores
    },
    detail: {
        marginBottom: 8,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "grey",
    },
    alive: {
        backgroundColor: "green",
    },
    dead: {
        backgroundColor: "red",
    },
    unknown: {
        backgroundColor: "blue",
    },
});
