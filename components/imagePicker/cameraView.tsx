import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onCancel: () => void;
  onTakePicture: (uri?: string) => void;
};

export function CameraComponent({ onCancel, onTakePicture }: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      onTakePicture(photo.uri);
    }
  }

  return (
    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
          <Ionicons name="sync-circle-sharp" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Ionicons name="camera-outline" size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="close-sharp" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    width: 400,
    marginTop: 670,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: "white",
    fontSize: 23,
  },

});


