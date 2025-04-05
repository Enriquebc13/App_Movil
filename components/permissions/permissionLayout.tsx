import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    granted: boolean;
    requestPermission: () => void;
}

export default function PermissionsLayout({ icon, title, granted, requestPermission }: Props) {
    return (
        <View style={styles.container}>
            {/* ICONOS DE LAS TARJETAS */}
            <Ionicons name={icon} size={48} color="black" />
            <Text style={styles.title}>{title}</Text>
            {granted ? (
                <Ionicons name="checkmark-circle" size={35} color="black" />
            ) : (
                <TouchableOpacity style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Autorizar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: 300,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
