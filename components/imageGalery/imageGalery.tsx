import { StyleSheet, View, FlatList, Image, StatusBar } from "react-native";
import { useState } from "react";
import ImagePicker from "../imagePicker/imagePicker";

export default function ImageGalery() {
  //Almacena un array de URIs de imágenes seleccionadas
  const [images, setImages] = useState<string[]>([]); 

  //Función recibe la uri de una imagen y la agrega al estado images
  const addImage = (uri: string) => {
    setImages((prev) => [...prev, uri]);
  };

  return (
    <View style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />
      <ImagePicker onImagePicked={addImage} />
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor:"#1a1a2e"
    backgroundColor:"#0a0521"
  },
  image: {
    width: 170,
    height: 300,
    marginTop:20,
    margin: 5,
    borderRadius: 10,
  },
});
