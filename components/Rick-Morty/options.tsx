import React from "react";
import { View, Text, Pressable, StyleSheet,Image, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
 
export default function OptionScreen({}) {
        const navigation = useNavigation<NativeStackNavigationProp<any>>();
    
    return (
        
        <ScrollView style={{flex:1, backgroundColor:"black"}}>
      <View  style={{alignItems:"center"}}>
            <ImageBackground  style={styles.container}
             source={require("../../assets/images/rick and morty1.jpg")} resizeMode="cover">
                          <Image style={styles.imgTitle}
                          source={require("../../assets/images/Titulo.png")}
                          />
            <View style={styles.botones}>
            <Pressable style={styles.button} onPress={() =>navigation.navigate('Personajes')}>
            <Text style={styles.buttonText}>P e r s o n a j e s</Text></Pressable>

            <Pressable style={styles.button} onPress={() =>navigation.navigate('Episodios')}>
            <Text style={styles.buttonText}>E p i s o d i o s</Text></Pressable>

            <Pressable style={styles.button} onPress={() =>navigation.navigate('Locaciones')}>
            <Text style={styles.buttonText}>L o c a c i o n e s</Text></Pressable>

            <Pressable style={styles.button} onPress={() =>navigation.navigate('About')}>
            <Text style={styles.buttonText}>-- A C E R C A  D E --</Text></Pressable>
            </View>
            </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
       backgroundColor:"black",
       flex:1,
       alignItems:"center",
       width:400,
       height:730,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    botones: {
    //    borderColor:"yellow",
    //    borderWidth:2,
    },
    button: {
        backgroundColor: "white",
        justifyContent:"center",
        borderRadius: 12,
        width: 350,
        height:35,
        marginTop:20,
        borderColor:"yellow",
        borderWidth:2,

    },
    buttonText: {
        textAlign:"center",
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    imgTitle: {
        width:407,
        height:115,
    },
    img: {
      width: 500,
      height:560,
    }
});
