// LoginView.js
import { useState } from "react";
import { Text, TextInput, View, Alert, ImageBackground, TouchableOpacity, StyleSheet, StatusBar, Image, KeyboardAvoidingView, Platform } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Importamos auth desde el archivo firebase
import { useNavigation } from "@react-navigation/native"; // Usamos useNavigation para redirigir
import { ScrollView } from "react-native-gesture-handler";

export default function LoginView() {
  const [email, setEmail] = useState("baezenrique114@gmail.com"); // Correo predefinido
  const [password, setPassword] = useState("appmovil1"); // Contraseña predefinida
  const navigation = useNavigation<any>(); 

  const handleLogin = async () => {
    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("¡Éxito!", "Has iniciado sesión correctamente.");
      
      
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas o problema de red.");
    }
  };

  return (
    <ImageBackground style={styles.background} source={require("../../assets/images/descarga (1).jpg")}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>INICIAR SESIÓN</Text>
          <Image style={styles.img} source={require("../../assets/images/img1.png")} />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            editable={false} // Hace que el campo sea solo lectura
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={false} // Hace que el campo sea solo lectura
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Definir los estilos
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "rgba(0,0,10, 0.5)",
    color:"white",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
  },
  background: {
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  img: {
    alignItems:"center",
    width:330,
    height:330,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
