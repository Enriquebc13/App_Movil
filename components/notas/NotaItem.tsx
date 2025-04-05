import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface NotaItemProps {
  titulo: string;
  texto: string;
  onEditar: () => void;
  onEliminar: () => void;
}

export default function NotaItem({ titulo, texto, onEditar, onEliminar }: NotaItemProps) {
  return (
    <View style={styles.nota}>
      <Text style={styles.notaTitulo}>{titulo}</Text>
      <Text style={styles.notaTexto}>{texto}</Text>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={onEditar}>
          <Text style={styles.accionTexto}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEliminar}>
          <Text style={styles.accionTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nota: {
    backgroundColor: "#1e1e40",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  notaTitulo: {
    color: "#ffd700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notaTexto: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
  },
  acciones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  accionTexto: {
    fontSize: 18,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 50,
    marginLeft: 10,
    color: "#fff",
    textAlign: "center",
  },
});
