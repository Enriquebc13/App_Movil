import { useEffect, useRef, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export function LocationView() {
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; timestamp: string } | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation<any>();

  // Función para guardar la ubicacion en Firestore
  async function saveLocationToFirestore(lat: number, lng: number) {
    try {
      await addDoc(collection(db, "visited_locations"), {
        latitude: lat,
        longitude: lng,
        timestamp: serverTimestamp(),
      });
      console.log("Ubicacion guardada:", lat, lng);
    } catch (error) {
      console.error("Error al guardar ubicación:", error);
    }
  }

  // Obtener ubicacion actual
  useEffect(() => {
    async function getCurrentLocation() {
      if (!permission?.granted) return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      saveLocationToFirestore(loc.coords.latitude, loc.coords.longitude);
    }

    getCurrentLocation();
  }, [permission]);

  // Mover la cámara del mapa cuando cambia la ubicacion
  useEffect(() => {
    async function showLocation() {
      if (location && mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
        });
      }
    }
    showLocation();
  }, [location]);

  if (!permission?.granted) {
    return (
      <View style={styles.infoContainer}>
        <Text>Debes permitir el acceso a la ubicación.</Text>
        <Button onPress={requestPermission} title="Permitir ubicación" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />
      
      <View style={styles.titleView}>
        <Text style={styles.title}>Ubicación aquí</Text>
      </View>

      {/* Mapa */}
      <MapView
        style={styles.map}
        ref={mapRef}
        zoomEnabled
        initialRegion={{
          latitude: 18.5955558,
          longitude: -98.4907685,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/*  Marcar ubicacion actual */}
        {location && (
          <Marker
            coordinate={location.coords}
            pinColor="red"
            onPress={() =>
              setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timestamp: new Date().toLocaleString(),
              })
            }
          />
        )}
      </MapView>

    
      {selectedLocation && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            📍 <Text style={styles.bold}>Latitud:</Text> {selectedLocation.latitude}
          </Text>
          <Text style={styles.infoText}>
            📍 <Text style={styles.bold}>Longitud:</Text> {selectedLocation.longitude}
          </Text>
          <TouchableOpacity onPress={() => setSelectedLocation(null)} style={styles.closeButton}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/*Botón para centrar en la ubicacion actual */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          if (location && mapRef.current) {
            mapRef.current.animateCamera({
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              zoom: 15,
            });
          }
        }}
      >
        <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>

      {/*Botón para ver historial */}
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('Historial')}
      >
        <Text style={styles.historyText}>Historial</Text>
        <MaterialIcons name="history" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 30,
  },
  historyButton: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 60,
    left: 20,
    backgroundColor: "#007AFF",
    height: 50,
    width: 120,
    padding: 10,
    borderRadius: 20,
    gap: 10,
  },
  historyText: {
    color: "white",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  titleView: {
    width: "100%",
    backgroundColor: "#0a0521",
    height: 50,
    borderTopColor: "white",
  },
  infoBox: {
    position: "absolute",
    bottom: 80,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },
  infoText: {
    color: "white",
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
  },
});
