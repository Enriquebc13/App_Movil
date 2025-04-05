import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
 

export default function HomeView() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <ImageBackground style={styles.container}
        source={require("../../assets/images/descarga (1).jpg")}>
            <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />
            <Text style={styles.title}>Elije una opcion 📱</Text>
<ScrollView style={{width:"100%"}}>


            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Rick and Morty")}>
                <Image  style={styles.imgBtn}
                source={require("../../assets/images/RICK AND MORTY.png")} />
                <Text style={styles.buttonText}>Rick and Morty</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Notas")}>
                <Image style={styles.imgBtn} source={require("../../assets/images/NOTAS.png")} />
                <Text style={styles.buttonText}>Notas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Permisos")}>
            <Image style={styles.imgBtn} source={require("../../assets/images/PERMISOS.png")} />
                <Text style={styles.buttonText}>Permisos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Galeria")}>
            <Image style={styles.imgBtn} source={require("../../assets/images/GALERIA.png")} />
                <Text style={styles.buttonText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Locacion")}>
            <Image style={styles.imgBtn} source={require("../../assets/images/UBICACION.png")} />
                <Text style={styles.buttonText}>Ubicacion</Text>
            </TouchableOpacity>

            </View>
            </ScrollView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: "center",
    },
    title: {
        color:"white",
        fontSize:45,
        textAlign:"center",
    },
    buttonContainer: {
        marginTop:30,
        alignItems:"center",
        width:"100%",
        height:"auto",
    },
    button:{
        width:"90%",
        height:100,
        marginTop:10,
        marginBottom:10,
        borderRadius:20,
        borderWidth:2,
        borderColor:"grey",
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor: "#0a0521",
        flexDirection:"row",
    },
    buttonText: {
        color:"white",
        fontSize:28,
    },
    imgBtn: {
        width:90,
        height:80,
        borderRadius:12,
    }
})