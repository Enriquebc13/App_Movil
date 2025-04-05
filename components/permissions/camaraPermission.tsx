import { useCameraPermissions } from "expo-camera";
import PermissionsLayout from "./permissionLayout";

export default function CameraPermissions() {
    const [permission, requestPermission] = useCameraPermissions();
    console.log (permission);
    return (
        <PermissionsLayout
            icon="camera-outline" 
            title="Camera"
            granted={permission?.granted || false}  
            requestPermission={requestPermission}
        />
    );
}
