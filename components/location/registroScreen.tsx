import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function RegistroScreen() {
  const [locations, setLocations] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  // 🔥 Obtener ubicaciones de Firebase en tiempo real
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

  // 📍 Obtener la ubicación actual del usuario
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación denegado");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    }
    getCurrentLocation();
  }, []);

  // 📌 Función para mover la vista del mapa a la ubicación actual
  const goToCurrentLocation = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 18.5955558,
          longitude: -98.4907685,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Mostrar la ubicación actual en rojo */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Tu ubicación"
            pinColor="red"
          />
        )}

        {/* Mostrar ubicaciones guardadas en Firebase en azul */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={selectedLocation?.id === location.id ? "green" : "#40366f"}
            onPress={() => setSelectedLocation(location)}
          />
        ))}
      </MapView>

      {/* 🔘 Botón flotante para ir a la ubicación actual */}
      <TouchableOpacity style={styles.button} onPress={goToCurrentLocation}>
        <Ionicons name="locate" size={30} color="white" />
      </TouchableOpacity>

      {/* 📌 Información de la ubicación seleccionada */}
      {selectedLocation && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Ubicacion: {new Date(selectedLocation.timestamp.seconds * 1000).toLocaleString()}
          </Text>
          <Text style={styles.infoText}>Lat: {selectedLocation.latitude}, Lng: {selectedLocation.longitude}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedLocation(null)}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
});
