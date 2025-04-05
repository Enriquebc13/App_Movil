import { Image, StyleSheet, Text, View } from "react-native";
import { Location } from "./locationType";

// Definición del tipo Props
type Props = {
    location: Location; // Propiedad
}

export function LocationCard({ location }: Props) {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={require("../../../assets/images/Titulo.png")}
            />

            <View style={styles.content}>
                <Text style={styles.name}>{location.name}</Text>

                <View style={styles.detail}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.fieldValue}>{location.type}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.label}>Dimensión:</Text>
                    <Text style={styles.fieldValue}>{location.dimension}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.label}>Residentes:</Text>
                    <Text style={styles.fieldValue}>{location.residents.length}</Text>
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
        resizeMode: "cover", // Asegura que la imagen se ajuste correctamente
    },
    content: {
        paddingLeft: 12,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    label: {
        fontSize: 14,
        color: "#b8e0ff", // Color claro para las etiquetas
        fontWeight: "bold",
    },
    name: {
        fontWeight: "700",
        fontSize: 18,
        color: "#fff", // Nombre en blanco
        marginBottom: 6,
    },
    fieldValue: {
        fontSize: 14,
        color: "#ccc", // Color gris claro para los valores
    },
    detail: {
        marginBottom: 8,
    },
});
