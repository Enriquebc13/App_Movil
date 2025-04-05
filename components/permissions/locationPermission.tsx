import { useForegroundPermissions } from "expo-location";
import PermissionsLayout from "./permissionLayout";

export default function GpsPermission() {

    const [permission, requestPermission] = useForegroundPermissions();

    return (
        <PermissionsLayout
            icon="location-outline"
            title="Ubicacion"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}