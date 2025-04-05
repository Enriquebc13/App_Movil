import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Asegúrate de tener esta importación

export default function ProfileView() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Función para obtener el email del usuario
  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email || "");
    }
  }, []);

  // Función para cerrar sesión con confirmación
  const handleSignOut = () => {
    setConfirmSignOut(true);
  };

  const confirmSignOutAction = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cerrar sesión.");
    }
  };

  const cancelSignOut = () => {
    setConfirmSignOut(false);
  };

  // Función para abrir la galería
  const pickImage = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
    }
  };

  // Función para abrir la cámara
  const takePhoto = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de foto de perfil */}
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.img}
              source={{
                uri: profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Información del usuario */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.infoText}>Enrique Baez</Text>

          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.infoText}>{userEmail}</Text>
        </View>

        {/* Nueva sección para la universidad */}
        <View style={styles.universityContainer}>
          <Ionicons name="school" size={24} color="white" />
          <Text style={styles.universityText}>Universidad Tecnológica de Izúcar de Matamoros</Text>
        </View>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para confirmar el cierre de sesión */}
      {confirmSignOut && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={confirmSignOut}
          onRequestClose={cancelSignOut}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>¿Seguro que quieres cerrar sesión?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={cancelSignOut}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmSignOutAction}
                >
                  <Text style={styles.modalButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para seleccionar la imagen */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar Imagen</Text>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Ionicons name="image" size={24} color="white" />
              <Text style={styles.modalButtonText}>Elegir de la Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.modalButtonText}>Tomar una Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0521",
    padding: 20,
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  img: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 15,
    textAlign: "center",
  },
  universityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  universityText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContainer: {
    backgroundColor: "#1c1c1c",
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  modalButtons: {
   alignItems:"center",
    width: 100,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    width: 220,
    justifyContent: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  confirmButton: {
    backgroundColor: "green",
  },
});
