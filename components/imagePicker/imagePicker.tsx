import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraComponent } from "./cameraView";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { NewPhotoPreview } from "./photoPreview"; // Importamos el componente

type Props = {
  onImagePicked: (uri: string) => void;
};

export default function ImagePicker({ onImagePicked }: Props) {
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Para la vista previa

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      onImagePicked(result.assets[0].uri);
      setOpen(false);
    }
  };

  const handleSavePhoto = (uri: string) => {
    onImagePicked(uri);
    setImagePreview(null);
    setOpen(false);
  };

  const RenderMenu = () => (
    <View style={styles.modalContainer}>
      {!cameraOpen && !imagePreview ? (
        <View style={styles.menu}>
          <Text style={styles.titleMenu}>Seleccione una opcion</Text>
          <TouchableOpacity style={styles.buttonOption} onPress={() => setCameraOpen(true)}>
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.option}> Camara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOption} onPress={pickImage}>
            <Ionicons name="image" size={24} color="white" />
            <Text style={styles.option}>Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.cancel}> Cancelar</Text>
          </TouchableOpacity>

        </View>
      ) : cameraOpen ? (
        <CameraComponent
          onCancel={() => setCameraOpen(false)}
          onTakePicture={(uri) => {
            setImagePreview(uri || null);
            setCameraOpen(false);
          }}
        />
      ) : imagePreview ? (
        <NewPhotoPreview
          uri={imagePreview}
          onSave={handleSavePhoto}
          onCancel={() => setImagePreview(null)}
          newPhoto={() => setCameraOpen(true)}
        />
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setOpen(true)}>
        <Text style={styles.title}>GALERIA</Text>
        <Ionicons name="camera-outline" size={50} color="white" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <RenderMenu />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 120,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "white",
  },
  title: {
    color: "yellow",
    fontSize: 20,
    fontWeight: "bold",
  },
  titleMenu: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  menu: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#1c1c1c",
    padding: 20,
    gap:20,
    borderRadius: 12,
    width: 290,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin:10,
  },
  cancel: {
    marginTop: 50,
    color: "red",
    fontSize: 25,
  },
  buttonOption: {
    flexDirection: "row",
    width: 240,
    justifyContent: "center",
    height: 50,
    borderColor: "white",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#007bff",
  }
});
