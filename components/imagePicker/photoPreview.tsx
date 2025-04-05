import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Platform, Alert } from "react-native";

type Props = {
  uri: string;
  onSave: (uri: string) => void;
  onCancel: () => void;
  newPhoto: () => void;
};

export function NewPhotoPreview({ uri, onSave, onCancel, newPhoto }: Props) {
  
  const handleSave = () => {
    onSave(uri);

    if (Platform.OS === "android") {
      ToastAndroid.show("Imagen guardada exitosamente", ToastAndroid.SHORT);
    } else {
      Alert.alert("Éxito", "Imagen guardada exitosamente");
    }
  };
  return (
    <>
    <View style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", width:400, height:630, justifyContent:"center", alignItems:"center",}}>
    <Image
        source={{ uri }}
        style={{
          width: "100%",
          aspectRatio: 1,
          resizeMode: "contain",
        }}
      />
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonOption} onPress={newPhoto}>
          <Ionicons name="camera-outline" size={32} color={"white"} />
          <Text style={{ color: "white" }}>Nueva foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOption} onPress={handleSave}>
          <Ionicons name="save-outline" size={32} color="white" />
          <Text style={{ color: "white" }}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOption} onPress={onCancel}>
          <Ionicons name="close" size={32} color="white" />
          <Text style={{ color: "white" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 330,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    gap: 50,
  },
  buttonOption: {
    alignItems: "center",
    justifyContent: "center"
  }
});
