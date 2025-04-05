import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import NotaItem from "./NotaItem";
import { agregarNota,
         editarNota,
         eliminarNota,
         obtenerNotas
 } from "@/lib/services/notasService";

export default function NotasView() {
  const [notas, setNotas] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tituloNota, setTituloNota] = useState("");
  const [textoNota, setTextoNota] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = obtenerNotas(setNotas);
    return () => unsubscribe && unsubscribe();
  }, []);

  const abrirModalNuevaNota = () => {
    setTituloNota("");
    setTextoNota("");
    setEditandoId(null);
    setModalVisible(true);
  };

  const handleGuardar = async () => {
    if (tituloNota.trim() === "" || textoNota.trim() === "") return;
    if (editandoId) {
      await editarNota(editandoId, tituloNota, textoNota);
    } else {
      await agregarNota(tituloNota, textoNota);
    }
    cerrarModal();
  };

  const cerrarModal = () => {
    setTituloNota("");
    setTextoNota("");
    setEditandoId(null);
    setModalVisible(false);
  };

  const handleEliminar = (id: string) => {
    Alert.alert("Eliminar nota", "¿Estás seguro que deseas eliminar esta nota?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarNota(id) },
    ]);
  };

  const handleEditar = (nota: any) => {
    setTituloNota(nota.titulo);
    setTextoNota(nota.texto);
    setEditandoId(nota.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas📱</Text>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotaItem
            titulo={item.titulo}
            texto={item.texto}
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item.id)}
          />
        )}
      />

      <TouchableOpacity style={styles.botonAgregar} onPress={abrirModalNuevaNota}>
        <Text style={styles.botonTexto}>+ Agregar Nota</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>
              {editandoId ? "Editar Nota" : "Nueva Nota"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={tituloNota}
              onChangeText={setTituloNota}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Escribe tu nota..."
              multiline
              value={textoNota}
              onChangeText={setTextoNota}
            />
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.botonTexto}>
                {editandoId ? "Guardar Cambios" : "Guardar"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCancelar} onPress={cerrarModal}>
              <Text style={styles.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0521",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  botonAgregar: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  botonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
  },
  botonGuardar: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  botonCancelar: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
});
