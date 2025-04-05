import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";


import CameraPermissions from "./camaraPermission";
import LocationPermissions from "./locationPermission";
import ContactsPermission from "./contacPermission";
import MicrophonePermissions from "./microphonePermission";
import CalendarPermissions from "./calendaryPermission";
import GalleryPermissions from "./galleryPermission";



export default function PermissionsView() {
    return (
        <ImageBackground style={styles.container} source={require("../../assets/images/descarga (2).jpg")}>
            <StatusBar barStyle="light-content" backgroundColor="#0a0521" hidden={false} />

            <Text style={styles.title}>Permisos 📱</Text>
            <View>
                <CameraPermissions />
                <LocationPermissions />
                <ContactsPermission />
                <MicrophonePermissions />
                <CalendarPermissions />
                <GalleryPermissions />
            </View>


        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#1a1a2e',
        alignItems: 'center',
    },
    title: {
        marginTop:30,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
})