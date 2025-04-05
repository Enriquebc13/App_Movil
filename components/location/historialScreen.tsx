import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function HistorialScreen() {
  const [locations, setLocations] = useState<any[]>([]);

  //Obtener datos desde firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "visited_locations"), (snapshot) => {
      const locationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationsData);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View style={styles.containerInfo}>
        <Ionicons name="globe" size={38} color="#00D8FF" />
        <Text style={styles.data}>Latitud: <Text style={styles.value}>{item.latitude}</Text></Text>
      </View>

      <View style={styles.containerInfo}>
        <Ionicons name="navigate" size={38} color="#FF6B00" />
        <Text style={styles.data}>Longitud: <Text style={styles.value}>{item.longitude}</Text></Text>
      </View>

      <View style={styles.containerInfo}>
        <Ionicons name="calendar" size={24} color="grey" />
        <Text style={styles.data}>Fecha: <Text style={styles.value}>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text></Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Historial de Ubicaciones</Text>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00D8FF", 
    textAlign: "center",
    marginVertical: 15,
  },
  item: {
    backgroundColor: "#1E1E2E", 
    padding: 15,
    marginBottom: 15,
    borderRadius: 18,
    shadowColor: "white",
    elevation: 5,
 
  },
  containerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  data: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E0E0E0"
  },
  value: {
    color: "grey",
  },
});
